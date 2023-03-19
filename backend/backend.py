from flask_lib import FlaskLib
import database
import time
import os
import json
import urllib

backend = FlaskLib()

if os.environ.get('SONU_BACKEND_ENV') == 'mohit':
  # I need to run 'sudo chown $USER:$USER /var/run/postgresql -R'
  #        and 'postgres -D /var/lib/pgsql/data' in another terminal.
  db = database.Database(dbname='everyone_active', user="mohit", password="mohit")
else:
  db = database.Database(dbname='everyone_active', user="sonu", password="sonu_pass", host='localhost')

CUSTOMER = "CUSTOMER"
ADMIN = "ADMIN"
STUDIO = "STUDIO"
DEFAULT_ROLE = "CUSTOMER"
ERROR_KEY = "error"


MEMBERSHIP_PLANS_FIELD = ["name", "price", "terms_and_conditions", "payment_frequency",
                          "expiry_duration", "expiry_duration_unit"]
STUDIOS_FIELD = ["name", "address", "capacity", "picture"]
TRAINERS_FIELD = ["name"]
SCHEDULE_TYPES_FIELD = ["name"]
SCHEDULES_FIELD = ["name", "start_time", "end_time", "schedule_date", "studio_id", "trainer", "schedule_type"]
SUBSCRIPTIONS_FIELD = ["card_number", "name", "expiry", "cvv", "billing_address", "membership_plan_id"]


def IsLogin(session):
  if "login_key" not in session:
    return False
  return ("id" in session["login_key"]) and ("role" in session["login_key"])

def GetLoginId(session):
  if IsLogin(session):
    return session["login_key"]["id"]
  return 0

def GetLoginRole(session):
  if IsLogin(session):
    return session["login_key"]["role"]
  return None

def ValidateAdminLogin(session, output):
  if GetLoginRole(session) == ADMIN:
    return True
  output[ERROR_KEY] = "Admin must be logged in for this API"
  return False

def ValidateCustomerLogin(session, output):
  if GetLoginRole(session) == CUSTOMER:
    return True
  output[ERROR_KEY] = "Customer must be logged in for this API"
  return False

def ValidateLogin(session, output):
  if GetLoginRole(session) in [ADMIN, CUSTOMER]:
    return True
  output[ERROR_KEY] = "Someone must be logged in for this API"
  return False

def ValidateInputs(params, frontend_dict, output):
  for field in params:
    if field not in frontend_dict:
      output[ERROR_KEY] = f"Required field {field} not found in API inputs"
      return False
  return True


def ParamWrap(value):
  return "{" + value + "}"

def InsertField(table, return_key, fields, frontend_dict):
  field_params = ', '.join(ParamWrap(x) for x in fields)
  query = f"INSERT INTO {table} ({', '.join(fields)}) VALUES ({field_params})"
  if return_key is not None:
    query += f" RETURNING {return_key} "
    result = db.readQuery(query, frontend_dict)
    return {return_key: result[0][return_key]}
  else:
    db.writeQuery(query, frontend_dict)
    return None


def AddEntity(table, key, fields, frontend_dict, session, roles):
  output = {}
  if roles != None and GetLoginRole(session) not in roles:
    return {ERROR_KEY: "This API cannot be called by current logged in role."}
  if not ValidateInputs(fields, frontend_dict, output):
    return output
  return InsertField(table, key, fields, frontend_dict)


def GetEntity(table, fields, frontend_dict, session):
  pass


def UpdateEntity(table, key, fields, frontend_dict, session, roles):
  output = {}
  if roles != None and GetLoginRole(session) not in roles:
    return {ERROR_KEY: "This API cannot be called by current logged in role."}
  if not ValidateInputs([key] + fields, frontend_dict, output):
    return output
  query_set_part = ", ".join(f"{field}={ParamWrap(field)}" for field in fields)
  query = f"UPDATE {table} SET {query_set_part} WHERE {key}={ParamWrap(key)}"
  db.writeQuery(query, frontend_dict)
  return {}


def DeleteEntity(table, key, frontend_dict, session, roles):
  output = {}
  if roles != None and GetLoginRole(session) not in roles:
    return {ERROR_KEY: "This API cannot be called by current logged in role."}
  if not ValidateInputs([key], frontend_dict, output):
    return output
  result = db.readQuery(f"DELETE FROM {table} WHERE {key}={ParamWrap(key)} RETURNING {key}",
                         frontend_dict)
  if len(result) == 0:
    return {ERROR_KEY: "Could not delete. No such entity found"}
  return {}


@backend.api('/hi')
def hi(d):
	return "Hello"

@backend.api('/my_name')
def my_name(d):
	time.sleep(1)
	return {"name": "I am React"}

@backend.api('/new_name')
def my_name(d):
	return {"name": "I am New Name"}

@backend.api('/sleep_for_5_seconds_and_return_name')
def my_name(d):
	time.sleep(5)
	return {"name": "[I am React][5s slept]"}

# Create account of a new user.
# Sample input: {name: "Name1", email: "name@g.com", password: "pass"}
# Sample output: {"id": 4}
# Possible output: {"error": "This email is already being used."}
# Possible output: {"error": ""}
@backend.api('/sign_up')
def sign_up(frontend_dict, session):
  output = {}
  if not ValidateInputs(["name", "email", "password"], frontend_dict, output):
    return output
  query1="SELECT id from users where email={email}"
  if('role' not in frontend_dict):
    frontend_dict['role'] = DEFAULT_ROLE
  if 'profile_pic' not in frontend_dict:
    frontend_dict['profile_pic'] = "images/person.png"
  if len(db.readQuery(query1, frontend_dict)) > 0:
    return {ERROR_KEY: "This email is already being used"}
  query2 = ("INSERT into users (name, email,password,role, profile_pic) "
            "VALUES ({name}, {email}, {password} ,{role}, {profile_pic})"
            " RETURNING id ")
  new_id = db.readQuery(query2, frontend_dict)[0]["id"]
  session['login_key'] = {
    "id": new_id,
    "role": frontend_dict["role"],
    "name": frontend_dict["name"],
    "profile_pic": frontend_dict["profile_pic"]
  }
  return dict(session['login_key'])


# Login an already existing user.
# Sample input: {email: "a@b.com", password: "pass"}
# Sample output: {"id": 5}
# Possible output: {"error": "Email or password is incorrect."}
@backend.api('/login')
def login(frontend_dict, session):
  query_output = db.readQuery("SELECT * from users where email={email} AND "
                              "password={password}", frontend_dict)
  if len(query_output) == 0:
    return {ERROR_KEY: "Email or password is incorrect."}
  uinfo = query_output[0]
  session['login_key'] = {
    "id": uinfo['id'],
    "role": uinfo['role'],
    "name": uinfo['name'],
    "profile_pic": uinfo["profile_pic"]
    }
  return dict(session['login_key'])


@backend.api('/logout')
def logout(frontend_dict, session):
  session["login_key"] = {}
  return {}




# An API for anyone to send OTP on their email to reset password.
# If the given email exists, an email will be sent with OTP.
# Input: {"email": "s1@gmail.com"}
# Sample Output: {}
@backend.api('/send_otp_for_reset_password')
def send_otp_for_reset_password(frontend_dict, session):
  # TODO: Code for sending email with OTP.
  return {}


# An API for to reset password using their OTP. This API must be used after
# '/send_otp_for_reset_password' API.
#
# Input: {"email": "s1@gmail.com", "otp": "27437", "new_password": "abc"}
# Sample Output: {}
# Possible Output: {"error": "Invalid OTP"}
@backend.api('/reset_password')
def reset_password(frontend_dict, session):
  output = {}
  if not ValidateInputs(["email", "otp", "new_password"], frontend_dict, output):
    return output
  if frontend_dict["otp"] != "101010":
    return {ERROR_KEY: "Invalid OTP"}
  db.writeQuery("""
      UPDATE users SET password = {new_password}
      WHERE email={email}""", frontend_dict)
  return {}



# Get the list of all users.
# Only admin can use this API.
#
# Input: {}
# Sample Output: {"all_users": [{"id": 1, "name": "Name1", ...},
#                               {"id": 2, "name": "Name2", ...}]}
# Possible Output: {"error": "Admin must be logged in for this API"}
@backend.api('/admin_get_all_users')
def admin_get_all_users(frontend_dict, session):
  output = {}
  if not ValidateAdminLogin(session, output):
    return output
  output["all_users"] = db.readQuery("""
    SELECT id, name, email, role, profile_pic
    FROM users ORDER BY id DESC""");
  return output


# An API for changing password.
#
# Sample input: {"old_password": "password1",
#                "new_password": "password2",
#                "repeat_password": "password2"}
# Possible Output: {}
# Possible Output: {"error": "Old password is not correct."}
@backend.api('/update_password')
def update_password(frontend_dict, session):
  frontend_dict["user_id"] = GetLoginId(session)
  if frontend_dict["new_password"] != frontend_dict["repeat_password"]:
    return {ERROR_KEY: "your password is different from repeat password"}
  result = db.readQuery("""
      SELECT id from users
      WHERE password = {old_password} AND id={user_id}""", frontend_dict)
  if len(result) == 0:
    return {ERROR_KEY: "Old password is not correct"}
  db.writeQuery("""
      UPDATE users SET password = {new_password}
      WHERE id={user_id}""", frontend_dict)
  return {}


# Upload a new file inside `public/data/` directory and return a link that can
# be used by front-end.
# This API can be used for uploading any kind of file - image, pdf, csv file or
# any other file.
#
# Sample Input: {"filename": "abc.pdf", "file_content": "x@2223#1@pso7zxsd"}
# Sample output: {"uploaded_filename": "data/file_34737.pdf"}
#
# This file link `data/file_34737.pdf` is permanent now, and it can be used by
# front-end.
@backend.api('/upload_file')
def upload_file(frontend_dict, session):
  output = {}
  if not ValidateLogin(session, output):
    return output
  directory = os.path.realpath(os.path.dirname(__file__) + "/../public/data")
  filename = "file_"+str(int(time.time()))+"." + frontend_dict["filename"].split(".")[-1]
  os.makedirs(directory, exist_ok=True)
  f = open(f"{directory}/{filename}", "wb")
  r = urllib.request.urlopen(frontend_dict["file_content"])
  f.write(r.file.read())
  f.close()
  return {"uploaded_filename": f"data/{filename}"}


# Get the profile information of a user. Eg: name, email, phone, role etc.
# This API can be called either by ADMIN or by currently logged in user.
# This API cannot be called by some other user. Only currently logged in user can see their
# information.
# Sample Input: {"user_id": 33}
# Possible Input: {}
# Note that if "user_id" is not given, this API will take currently logged in user's id.
#
# Sample output: {"user_info": {"name": "Sonu", "email": "s2@gmail.com", "role": "STUDENT", ...}}
# Possible output: {"error": "Invalid user_id"}
@backend.api('/get_user_profile')
def get_user_profile(frontend_dict, session):
  if "user_id" not in frontend_dict:
    frontend_dict["user_id"] = GetLoginId(session)
  elif GetLoginRole(session) != ADMIN and frontend_dict["user_id"] != GetLoginId(session):
    return {ERROR_KEY: "Only admin can access profile information of other users."}
  l = db.readQuery("""SELECT id, name, email, role
                    FROM users WHERE id = {user_id}""", frontend_dict)
  if len(l) != 0:
    return {"user_info": l[0]}
  else:
    return {ERROR_KEY:"Invalid user_id"}

# An API for admin to add a new membership_plan.
#
# Sample input: {"name": "Monthly Plan", "price": 3939, "terms_and_conditions": "..",
#                "payment_frequency": "MONTHLY", "expiry_duration": 5,
#                "expiry_duration_unit": "MONTH"}
#
# @payment_frequency could be [FREE, ONE_TIME, MONTHLY, YEARLY]
# @expiry_duration_unit could be [DAYS, MONTHS, YEARS]
#
# Output: {"id": 44}
@backend.api('/add_membership_plan')
def add_membership_plan(frontend_dict, session):
  return AddEntity("membership_plans", "id", MEMBERSHIP_PLANS_FIELD, frontend_dict, session, [ADMIN])


# An API to get all the membership_plans.
# Sample input: {}
# Sample output: 
# {"results": [
#     {"id": 56,
#      "name": "Monthly Plan",
#      "price": 3939,
#      "terms_and_conditions": "..",
#      "payment_frequency": "MONTHLY",
#      "expiry_duration": 5,
#      "expiry_duration_unit": "MONTH"
#     }, ....]
#
# Possible output: {"error": "Invalid"}
@backend.api('/get_all_membership_plans')
def get_all_membership_plans(frontend_dict, session):
  return {"results": db.readQuery(
      "SELECT * from membership_plans ORDER BY id DESC", frontend_dict)}


# An API for admin to update the information of an membership_plan.
# Sample input: {
#      "id": 56,
#      "name": "Monthly Plan",
#      "price": 3939,
#      "terms_and_conditions": "..",
#      "payment_frequency": "MONTHLY",
#      "expiry_duration": 5,
#      "expiry_duration_unit": "MONTH"
#     }
# Sample output: {}
# Possible output: {"error": "Invalid"}
@backend.api('/update_membership_plan')
def update_membership_plan(frontend_dict, session):
  return UpdateEntity("membership_plans", "id", MEMBERSHIP_PLANS_FIELD, frontend_dict, session, [ADMIN])


# An API for admin to delete a membership_plan.
#
# Sample input: {"id": 16}
# Sample Output: {}
# Possible Output: {"error": "Invalid membership_plan"}
@backend.api('/delete_membership_plan')
def delete_membership_plan(frontend_dict, session):
  return DeleteEntity("membership_plans", "id", frontend_dict, session, [ADMIN])


# An API for admin to add a new studio.
#
# Sample input: {
#     "name": "Victoria",
#     "address": "27 Victoria Street",
#     "capacity": 30,
#     "picture": "image_url",
# }
#
# Output: {"id": 44}
@backend.api('/add_studio')
def add_studio(frontend_dict, session):
  return AddEntity("studios", "id", STUDIOS_FIELD, frontend_dict, session, [ADMIN])


# An API to get all the studios.
# Sample input: {}
# Sample output: 
# {"results": [
#    {"id": 56,
#     "name": "Victoria",
#     "address": "27 Victoria Street",
#     "capacity": 30,
#     "picture": "image_url",
#     }, ....]
#
# Possible output: {"error": "Invalid"}
@backend.api('/get_all_studios')
def get_all_studios(frontend_dict, session):
  return {"results": db.readQuery(
      "SELECT * from studios ORDER BY id DESC", frontend_dict)}


# An API for admin to update the information of an studio.
# Sample input: {
#     "id": 56,
#     "name": "Kings Cross",
#     "address": "207 Euston Road",
#     "capacity": 25,
#     "picture": "image_url",
#     }
# Sample output: {}
# Possible output: {"error": "Invalid"}
@backend.api('/update_studio')
def update_studio(frontend_dict, session):
  return UpdateEntity("studios", "id", STUDIOS_FIELD, frontend_dict, session, [ADMIN])


# An API for admin to delete a studio.
#
# Sample input: {"id": 16}
# Sample Output: {}
# Possible Output: {"error": "Invalid studio"}
@backend.api('/delete_studio')
def delete_studio(frontend_dict, session):
  return DeleteEntity("studios", "id", frontend_dict, session, [ADMIN])


# An API for admin to add a new trainer.
#
# Sample input: {
#     "name": "Trainer1",
# }
#
# Output: {"id": 44}
@backend.api('/add_trainer')
def add_trainer(frontend_dict, session):
  return AddEntity("trainers", "id", TRAINERS_FIELD, frontend_dict, session, [ADMIN])


# An API to get all the trainers.
# Sample input: {}
# Sample output: 
# {"results": [
#    {"id": 56,
#     "name": "Trainer1",
#     }, ....]
#
# Possible output: {"error": "Invalid"}
@backend.api('/get_all_trainers')
def get_all_trainers(frontend_dict, session):
  return {"results": db.readQuery(
      "SELECT * from trainers ORDER BY id DESC", frontend_dict)}


# An API for admin to update the information of an trainer.
# Sample input: {
#     "id": 56,
#     "name": "Trainer1",
#     }
# Sample output: {}
# Possible output: {"error": "Invalid"}
@backend.api('/update_trainer')
def update_trainer(frontend_dict, session):
  return UpdateEntity("trainers", "id", TRAINERS_FIELD, frontend_dict, session, [ADMIN])


# An API for admin to delete a trainer.
#
# Sample input: {"id": 16}
# Sample Output: {}
# Possible Output: {"error": "Invalid trainer"}
@backend.api('/delete_trainer')
def delete_trainer(frontend_dict, session):
  return DeleteEntity("trainers", "id", frontend_dict, session, [ADMIN])


# An API for admin to add a new schedule_type.
#
# Sample input: {
#     "name": "Badminton",
# }
#
# Output: {"id": 44}
@backend.api('/add_schedule_type')
def add_schedule_type(frontend_dict, session):
  return AddEntity("schedule_types", "id", SCHEDULE_TYPES_FIELD, frontend_dict, session, [ADMIN])


# An API to get all the schedule_types.
# Sample input: {}
# Sample output: 
# {"results": [
#    {"id": 56,
#     "name": "Yoga",
#     }, ....]
#
# Possible output: {"error": "Invalid"}
@backend.api('/get_all_schedule_types')
def get_all_schedule_types(frontend_dict, session):
  return {"results": db.readQuery(
      "SELECT * from schedule_types ORDER BY id DESC", frontend_dict)}


# An API for admin to update the information of an schedule_type.
# Sample input: {
#     "id": 56,
#     "name": "Swimming",
#     }
# Sample output: {}
# Possible output: {"error": "Invalid"}
@backend.api('/update_schedule_type')
def update_schedule_type(frontend_dict, session):
  return UpdateEntity("schedule_types", "id", SCHEDULE_TYPES_FIELD, frontend_dict, session, [ADMIN])


# An API for admin to delete a schedule_type.
#
# Sample input: {"id": 16}
# Sample Output: {}
# Possible Output: {"error": "Invalid schedule_type"}
@backend.api('/delete_schedule_type')
def delete_schedule_type(frontend_dict, session):
  return DeleteEntity("schedule_types", "id", frontend_dict, session, [ADMIN])


# An API for admin to add a new schedule.
#
# Sample input: {
#     "name": "Slow Yoga",
#     "start_time": "15:00",
#     "end_time": "16:00",
#     "schedule_date": "2023-03-08",
#     "studio_id": 12,
#     "trainer": "Abel Sebnam",
#     "schedule_type": "Badminton",
# }
#
# Output: {"id": 44}
@backend.api('/add_schedule')
def add_schedule(frontend_dict, session):
  return AddEntity("schedules", "id", SCHEDULES_FIELD, frontend_dict, session, [ADMIN])


# An API to get all the schedules for a date and a studio.
# Sample input: {"schedule_date": "2023-03-08", "studio_id": 44}
# Sample output: 
# {"results": [
#    {"id": 56,
#     "name": "Slow Yoga",
#     "start_time": "15:00",
#     "end_time": "16:00",
#     "schedule_date": "2023-03-08",
#     "studio_id": 12,
#     "trainer": "Abel Sebnam",
#     "schedule_type": "Badminton",
#     }, ....]
#
# Possible output: {"error": "Invalid"}
@backend.api('/get_all_schedules')
def get_all_schedules(frontend_dict, session):
  return {"results": db.readQuery(
      "SELECT * from schedules WHERE schedule_date={schedule_date} AND studio_id={studio_id} ORDER BY id DESC", frontend_dict)}


# An API for admin to update the information of an schedule.
# Sample input: {
#     "id": 56,
#     "name": "Power Yoga",
#     "start_time": "15:00",
#     "end_time": "16:00",
#     "schedule_date": "2023-03-08",
#     "studio_id": 12,
#     "trainer": "Abel Sebnam",
#     "schedule_type": "Badminton",
#     }
# Sample output: {}
# Possible output: {"error": "Invalid"}
@backend.api('/update_schedule')
def update_schedule(frontend_dict, session):
  return UpdateEntity("schedules", "id", SCHEDULES_FIELD, frontend_dict, session, [ADMIN])


# An API for admin to delete a schedule.
#
# Sample input: {"id": 16}
# Sample Output: {}
# Possible Output: {"error": "Invalid schedule"}
@backend.api('/delete_schedule')
def delete_schedule(frontend_dict, session):
  return DeleteEntity("schedules", "id", frontend_dict, session, [ADMIN])

def GetActiveMembership(frontend_dict):
  result = db.readQuery("SELECT * from subscriptions where is_active=true AND user_id={user_id}", frontend_dict)
  return None if len(result) == 0 else result[0]

# An API for joining membership.
# Input: {
#   "membership_plan_id": 2
#   "card_number": "3383 4488 4470",
#   "name": "Paul Saini",
#   "expiry": "02/25",
#   "cvv": "344",
#   "billing_address": "London",
# }
# Sample Output: {"status": "Joined"}
# Possible Output: {"error": "Invalid"}
@backend.api('/join_membership')
def join_membership(frontend_dict, session):
  output = {}
  if not ValidateInputs(SUBSCRIPTIONS_FIELD, frontend_dict, output):
    return output
  frontend_dict["user_id"] = GetLoginId(session)
  membership = GetActiveMembership(frontend_dict)
  if membership is not None:
    return {ERROR_KEY: "You already have an active membership plan."}
  frontend_dict["is_active"] = True
  InsertField("subscriptions", None, SUBSCRIPTIONS_FIELD + ["is_active", "user_id"], frontend_dict)
  return {"status": "Joined"}

def CreateListFilter(db_column, values, frontend_dict):
  query_parts = []
  for i, v in enumerate(values):
    new_key = f"{db_column}_{i}"
    frontend_dict[new_key] = v
    query_parts.append(f"{db_column}={ParamWrap(new_key)}")
  return " OR ".join(query_parts)


BOOKINGS_VIEW = "SELECT schedule_id, count(user_id) as num_bookings FROM bookings GROUP BY schedule_id"


SCHEDULES_WITH_BOOKINGS_VIEW = f"""
  SELECT
    schedules.*,
    COALESCE(bookings_view.num_bookings, 0) as num_bookings,
    studios.capacity, studios.address, studios.name as studio_name
  FROM schedules
      LEFT JOIN ({BOOKINGS_VIEW}) bookings_view
        ON bookings_view.schedule_id = schedules.id
      LEFT JOIN studios
        ON studios.id =  schedules.studio_id
"""

def IndexSchedules(schedules, date_list):
  date_indexed = dict((session_date, []) for session_date in date_list)
  for schedule in schedules:
    date_indexed[schedule["schedule_date"]].append(schedule)
  return [dict(date=session_date, schedules=date_indexed.get(session_date, [])) for session_date in date_list]




# An API for getting the information of upcoming schedules for the entire week.
# Input: {
#   "studio_id_list": [2]
#   "date_list": ["2023-03-08", "2023-03-09"],
#   "schedule_type": "Yoga",
# }
# Sample Output: {"result": [
#  {
#   "date": "2023-03-08",
#   "schedules": [
#     {
#       "name": "Slow Yoga",
#       "start_time": "07:00",
#       "end_time": "08:00",
#       ...
#     },
#     {
#       "name": "Power Yoga",
#       "start_time": "09:00",
#       "end_time": "11:00",
#       ...
#     },
#     ...
#   ]
#  },
#  {
#   "date": "2023-03-09",
#   "schedules": [
#     {
#       "name": "Power Yoga",
#       "start_time": "17:00",
#       "end_time": "18:00",
#       ...
#     },
#     {
#       "name": "Slow Yoga",
#       "start_time": "19:00",
#       "end_time": "20:00",
#       ...
#     },
#     ...
#   ]
#  },
# ]}
# Possible Output: {"error": "Invalid"}
@backend.api('/get_upcoming_schedules')
def get_upcoming_schedules(frontend_dict, session):
  output = {}
  if not ValidateInputs(["date_list", "studio_id_list"], frontend_dict, output):
    return output
  if len(frontend_dict["date_list"]) == 0:
    return {ERROR_KEY: "No dates in API input"}
  if len(frontend_dict["studio_id_list"]) == 0:
    return {ERROR_KEY: "No studio_id in API input"}
  q_date_filter = CreateListFilter("schedule_date", frontend_dict["date_list"], frontend_dict)
  q_studio_filter = CreateListFilter("studio_id", frontend_dict["studio_id_list"], frontend_dict)
  other_filters = "schedule_type={schedule_type}"
  query = SCHEDULES_WITH_BOOKINGS_VIEW + f" WHERE ({q_date_filter}) AND ({q_studio_filter}) AND {other_filters} ORDER BY schedules.schedule_date ASC, schedules.start_time ASC, schedules.id ASC"
  schedules = db.readQuery(query, frontend_dict)
  return {"results": IndexSchedules(schedules, frontend_dict["date_list"])}


# An API for customer to book a schedule.
# Input: {"schedule_id": 23}
# Sample Output: {}
# Possible Output: {"error": "You cannot book"}
@backend.api('/book_schedule')
def book_schedule(frontend_dict, session):
  output = {}
  if not ValidateLogin(session, output):
    return output
  if not ValidateInputs(["schedule_id"], frontend_dict, output):
    return output
  frontend_dict["user_id"] = GetLoginId(session)
  membership = GetActiveMembership(frontend_dict)
  if membership is None:
    return {ERROR_KEY: "You don't have active membership plan."}
  InsertField("bookings", None, ["schedule_id", "user_id"], frontend_dict)
  return {}


# An API for customer to cancel a booked schedule.
# Input: {"schedule_id": 23}
# Sample Output: {}
# Possible Output: {"error": "Cannot cancel"}
@backend.api('/cancel_booking')
def cancel_booking(frontend_dict, session):
  output = {}
  if not ValidateLogin(session, output):
    return output
  if not ValidateInputs(["schedule_id"], frontend_dict, output):
    return output
  frontend_dict["user_id"] = GetLoginId(session)
  query = "DELETE from bookings where user_id={user_id} AND schedule_id={schedule_id} RETURNING {schedule_id}"
  result = db.readQuery(query, frontend_dict)
  if len(result) == 0:
    return {"error": "Could not cancel"}
  return {}


# An API for checkin from the tab in studio.
# Input: {"schedule_id": 23, "user_id": 33}
# Sample Output: {}
# Possible Output: {"error": "Invalid checkin"}
@backend.api('/studio_checkin')
def studio_checkin(frontend_dict, session):
  output = {}
  if GetLoginRole(session) not in [STUDIO, ADMIN]:
    return {ERROR_KEY: "This API can be called only by STUDIO or ADMIN role."}
  if not ValidateInputs(["schedule_id", "user_id"], frontend_dict, output):
    return output
  frontend_dict["checkin_time"] = int(time.time())
  query = "UPDATE bookings SET checkin_time={checkin_time} WHERE user_id={user_id} AND schedule_id={schedule_id} RETURNING {schedule_id}"
  result = db.readQuery(query, frontend_dict)
  if len(result) == 0:
    return {"error": "Invalid checkin"}
  return {}


# An API for gettting studio checkin list.
# Input: {"schedule_id": 33}
# Sample Output: {}
# Possible Output: {"error": "Invalid schedule"}
@backend.api('/get_studio_checkin_list')
def get_studio_checkin_list(frontend_dict, session):
  output = {}
  if GetLoginRole(session) not in [STUDIO, ADMIN]:
    return {ERROR_KEY: "This API can be called only by STUDIO or ADMIN role."}
  if not ValidateInputs(["schedule_id"], frontend_dict, output):
    return output
  query = """
    SELECT bookings.user_id, users.name,
    (checkin_time IS NOT NULL) as is_checked_in
    FROM bookings
        LEFT JOIN users on users.id = bookings.user_id
    WHERE schedule_id={schedule_id}
    ORDER BY users.name ASC, bookings.user_id DESC """
  return {"results": db.readQuery(query, frontend_dict)}


if __name__ == "__main__":
  backend.run(port=5504)

