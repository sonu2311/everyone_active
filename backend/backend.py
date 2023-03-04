from flask_lib import FlaskLib
import database
import time
import os

backend = FlaskLib()

if os.environ.get('SONU_BACKEND_ENV') == 'mohit':
  # I need to run 'sudo chown $USER:$USER /var/run/postgresql -R'
  #        and 'postgres -D /var/lib/pgsql/data' in another terminal.
  db = database.Database(dbname='everyone_active', user="mohit", password="mohit")
else:
  db = database.Database(dbname='everyone_active', user="sonu", password="sonu_pass", host='localhost')

CUSTOMER = "CUSTOMER"
ADMIN = "ADMIN"
DEFAULT_ROLE = "USER"
MEMBERSHIP_PLANS_FIELD = ["name", "price", "terms_and_conditions", "payment_frequency",
                          "expiry_duration", "expiry_duration_unit"]

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
  output["error"] = "Admin must be logged in for this API"
  return False

def ValidateCustomerLogin(session, output):
  if GetLoginRole(session) == CUSTOMER:
    return True
  output["error"] = "Customer must be logged in for this API"
  return False

def ValidateLogin(session, output):
  if GetLoginRole(session) in [ADMIN, CUSTOMER]:
    return True
  output["error"] = "Someone must be logged in for this API"
  return False

def ValidateInputs(params, frontend_dict, output):
  for field in params:
    if field not in frontend_dict:
      output["error"] = f"Required field {field} not found in API inputs"
      return False
  return True



def ParamWrap(value):
  return "{" + value + "}"


def AddEntity(table, key, fields, frontend_dict, session, roles):
  output = {}
  if roles != None and GetLoginRole(session) not in roles:
    return {"error": "This API cannot be called by current logged in role."}
  if not ValidateInputs(fields, frontend_dict, output):
    return output
  field_params = ', '.join(ParamWrap(x) for x in fields)
  query = f"INSERT INTO {table} ({', '.join(fields)}) VALUES ({field_params}) RETURNING {key}"
  result = db.readQuery(query, frontend_dict)
  return {key: result[0][key]}


def GetEntity(table, fields, frontend_dict, session):
  pass


def UpdateEntity(table, key, fields, frontend_dict, session, roles):
  output = {}
  if roles != None and GetLoginRole(session) not in roles:
    return {"error": "This API cannot be called by current logged in role."}
  if not ValidateInputs([key] + fields, frontend_dict, output):
    return output
  query_set_part = ", ".join(f"{field}={ParamWrap(field)}" for field in fields)
  query = f"UPDATE {table} SET {query_set_part} WHERE {key}={ParamWrap(key)}"
  db.writeQuery(query, frontend_dict)
  return {}


def DeleteEntity(table, key, frontend_dict, session, roles):
  output = {}
  if roles != None and GetLoginRole(session) not in roles:
    return {"error": "This API cannot be called by current logged in role."}
  if not ValidateInputs([key], frontend_dict, output):
    return output
  result = db.readQuery(f"DELETE FROM {table} WHERE {key}={ParamWrap(key)} RETURNING {key}",
                         frontend_dict)
  if len(result) == 0:
    return {"error": "Could not delete. No such entity found"}
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
    return {"error": "This email is already being used"}
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
    return {"error": "Email or password is incorrect."}
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
    return {"error": "Invalid OTP"}
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
    return {"error": "your password is different from repeat password"}
  result = db.readQuery("""
      SELECT id from users
      WHERE password = {old_password} AND id={user_id}""", frontend_dict)
  if len(result) == 0:
    return {"error": "Old password is not correct"}
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
    return {"error": "Only admin can access profile information of other users."}
  l = db.readQuery("""SELECT id, name, email, role
                    FROM users WHERE id = {user_id}""", frontend_dict)
  if len(l) != 0:
    return {"user_info": l[0]}
  else:
    return {"error":"Invalid user_id"}

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
# {"membership_plans": [
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
  return {"membership_plans": db.readQuery(
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


if __name__ == "__main__":
  backend.run(port=5504)

