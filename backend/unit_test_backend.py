#!/usr/bin/env python3

import unittest
import sys
import backend
import time

g_session = {}

tables = ["users", "membership_plans", "studios", "trainers", "schedule_types", "schedules" ]
ADMIN = "ADMIN"
ERROR_KEY = "error"

flags = ["--clean_database_at_start", '--dont_clean_database_at_end']
# flags = []

db = backend.db


def GetPartialDict(d, keys):
  return dict((key, d[key]) for key in keys)


def IsDictSubset(d1, d2):
  """Return true if @d1 is dict-subset of @d2. d1's keys should be in d2 and have same values"""
  for k, v in d1.items():
    if k not in d2 or d2[k] != v:
      return False
  return True


def IsDictSubsetList(l1, l2):
  """Return true if each element of @l1 is dict-subset of corresponding @l2 element"""
  if len(l1) != len(l2):
    return False
  for i, x in enumerate(l1):
    if not IsDictSubset(x, l2[i]):
      return False
  return True


def ConstructCrudInfoFromSamples(n, fields_sample):
  output = []
  for i in range(n):
    d = {}
    for k, v in fields_sample.items():
      d[k] = v[i % len(v)]
    output.append(d)
  return output


class TestStringMethods(unittest.TestCase):

  @classmethod
  def setUpClass(cls):
    if "--clean_database_at_start" in flags:
      cls.cleanDatabase()
    for table in tables:
      query = f"SELECT count(*) as num from {table}" + (" WHERE role != 'ADMIN'  AND role != 'STUDIO'" if table == "users" else "")
      assert db.readQuery(query)[0]["num"] == 0, f"Table {table} should not have data when running these unittests. Drop all tables and recreate them again to reach at clean stage."

  @classmethod
  def cleanDatabase(cls):
    for table in tables:
      query = f"DELETE from {table}" + (" WHERE role != 'ADMIN' AND role != 'STUDIO'" if table == "users" else "")
      db.writeQuery(query)

  @classmethod
  def tearDownClass(cls):
    if '--dont_clean_database_at_end' not in flags:
      cls.cleanDatabase()

  def login(self, email, password):
    result = backend.login(dict(email=email, password=password), g_session)
    self.assertTrue(ERROR_KEY not in result)
    return result

  def step_login_signup(self):
    signup_ids = []
    for (name, email, password) in [("Name1", "n1@g.com", "p1"),
                                    ("Name2", "n2@g.com", "p2"),
                                    ("Name3", "n3@g.com", "p3")]:
      response = backend.sign_up(dict(name=name, email=email, password=password), g_session)
      self.assertNotEqual(g_session, {})
      self.assertTrue("login_key" in g_session)
      self.assertTrue("id" in g_session["login_key"])
      self.assertEqual(g_session["login_key"].get("role"), backend.DEFAULT_ROLE)
      self.assertEqual(g_session["login_key"].get("id"), response["id"])
      signup_id = response["id"]
      signup_ids.append(signup_id)
      self.assertEqual(g_session["login_key"].get("name"), name)
      self.assertTrue(response["id"] > 0)
      backend.logout({}, g_session)
      self.assertTrue("login_key" not in g_session or "id" not in g_session["login_key"])

      response = backend.login(dict(email=email, password=password), g_session)
      self.assertTrue("login_key" in g_session)
      self.assertTrue("id" in g_session["login_key"])
      self.assertEqual(g_session["login_key"].get("role"), backend.DEFAULT_ROLE)
      self.assertEqual(g_session["login_key"].get("id"), response["id"])
      self.assertEqual(g_session["login_key"].get("id"), signup_id)
      self.assertEqual(g_session["login_key"].get("name"), name)
      backend.logout({}, g_session)
      self.assertTrue("login_key" not in g_session or "id" not in g_session["login_key"])

    self.user1 = signup_ids[0]
    self.user2 = signup_ids[1]
    self.user3 = signup_ids[2]
    response = backend.login(dict(email="name3@g.com", password="p2"), g_session)
    self.assertTrue(ERROR_KEY in response)
    response = backend.login(dict(email="name2@g.com", password="p3"), g_session)
    self.assertTrue(ERROR_KEY in response)

  def crud_test(self, api_base, fields_sample, get_api_inputs=None):
    get_api_inputs = get_api_inputs or {}
    result = backend.__getattribute__(f"get_all_{api_base}s")(get_api_inputs, g_session)
    self.assertTrue(ERROR_KEY not in result)
    self.assertEqual(len(result["results"]), 0)

    (info1, info2, info3) = ConstructCrudInfoFromSamples(3, fields_sample)
    result = backend.__getattribute__(f"add_{api_base}")(info1, g_session)
    self.assertTrue(ERROR_KEY not in result)
    id1 = result["id"]

    result = backend.__getattribute__(f"add_{api_base}")(info2, g_session)
    self.assertTrue(ERROR_KEY not in result)
    id2 = result["id"]

    result = backend.__getattribute__(f"add_{api_base}")(info3, g_session)
    self.assertTrue(ERROR_KEY not in result)
    id3_to_delete = result["id"]

    result = backend.__getattribute__(f"get_all_{api_base}s")(get_api_inputs, g_session)
    self.assertTrue(ERROR_KEY not in result)
    self.assertEqual(len(result["results"]), 3)
    self.assertEqual(result["results"][0]["id"], id3_to_delete)
    self.assertEqual(result["results"][1]["id"], id2)
    self.assertEqual(result["results"][2]["id"], id1)
    self.assertTrue(IsDictSubset(info3, result["results"][0]))
    self.assertTrue(IsDictSubset(info2, result["results"][1]))
    self.assertTrue(IsDictSubset(info1, result["results"][2]))

    info = dict(info3)
    info["id"] = id3_to_delete
    first_key = list(fields_sample.keys())[0]
    info[first_key] = fields_sample[first_key][0]

    result = backend.__getattribute__(f"update_{api_base}")(info, g_session)
    self.assertTrue(ERROR_KEY not in result)
    result = backend.__getattribute__(f"get_all_{api_base}s")(get_api_inputs, g_session)
    self.assertTrue(ERROR_KEY not in result)
    self.assertEqual(len(result["results"]), 3)
    self.assertEqual(result["results"][0]["id"], id3_to_delete)
    self.assertTrue(IsDictSubset(info, result["results"][0]))
    self.assertTrue(IsDictSubset(info2, result["results"][1]))
    self.assertTrue(IsDictSubset(info1, result["results"][2]))

    result = backend.__getattribute__(f"delete_{api_base}")({"id": id3_to_delete}, g_session)
    self.assertTrue(ERROR_KEY not in result)
    result = backend.__getattribute__(f"get_all_{api_base}s")(get_api_inputs, g_session)
    self.assertTrue(ERROR_KEY not in result)
    self.assertEqual(len(result["results"]), 2)
    self.assertTrue(IsDictSubset(info2, result["results"][0]))
    self.assertTrue(IsDictSubset(info1, result["results"][1]))
    return id1, id2


  def step_membership_plans(self):
    self.login("admin@admin.com", "password")
    self.mplan_id1, self.mplan_id2 = self.crud_test("membership_plan", {
        "name": ["Monthly Plan", "Free Trial", "Yearly Plan"],
        "price": [39, 100, 3949],
        "terms_and_conditions": ["T1", "T2", "T3"],
        "payment_frequency": ["MONTHLY", "YEARLY", "ONE_TIME"],
        "expiry_duration": [5, 4, 6],
        "expiry_duration_unit": ["MONTHS", "YEARS"]})

  def step_studios(self):
    self.login("admin@admin.com", "password")
    self.studio_id1, self.studio_id2 = self.crud_test("studio", {
        "name": ["Kings Cross1", "Kings Cross2", "Kings Cross3"],
        "address": ["207 Euston Road", "206 Euston Road", "209 Euston Road"],
        "picture": ["image_url1", "image_url2", "image_url3"],
        "capacity": [25, 24, 26]})

  def step_trainers(self):
    self.login("admin@admin.com", "password")
    self.trainer_id1, self.trainer_id2 = self.crud_test("trainer", {
        "name": ["Trainer1", "Trainer2", "Trainer3"]})

  def step_schedule_types(self):
    self.login("admin@admin.com", "password")
    self.schedule_type1, self.schedule_type2 = self.crud_test("schedule_type", {
        "name": ["Badminton", "Yoga", "Swimming"]})

  def step_schedules(self):
    self.login("admin@admin.com", "password")
    self.schedule_id1, self.schedule_id2 = self.crud_test("schedule", {
        "name": ["Slow Yoga", "Power Yoga", "Hot Yoga"],
        "start_time": ["13:00", "17:00", "19:00"],
        "end_time": ["14:00", "18:00", "20:00"],
        "schedule_date": ["2022-03-13"],
        "studio_id": [self.studio_id1],
        "trainer": ["Trainer1", "Trainer2", "Trainer3"],
        "schedule_type": ["Yoga"],
      }, {
        "schedule_date": "2022-03-13",
        "studio_id": self.studio_id1,
      })
    self.schedule_id3, self.schedule_id4 = self.crud_test("schedule", {
        "name": ["Slow Yoga", "Power Yoga", "Hot Yoga"],
        "start_time": ["13:00", "17:00", "19:00"],
        "end_time": ["14:00", "18:00", "20:00"],
        "schedule_date": ["2022-03-14"],
        "studio_id": [self.studio_id1],
        "trainer": ["Trainer1", "Trainer2", "Trainer3"],
        "schedule_type": ["Yoga"],
      }, {
        "schedule_date": "2022-03-14",
        "studio_id": self.studio_id1,
      })
    self.schedule_id5, self.schedule_id6 = self.crud_test("schedule", {
        "name": ["Slow Yoga", "Power Yoga", "Hot Yoga"],
        "start_time": ["13:00", "17:00", "19:00"],
        "end_time": ["14:00", "18:00", "20:00"],
        "schedule_date": ["2022-03-13"],
        "studio_id": [self.studio_id2],
        "trainer": ["Trainer1", "Trainer2", "Trainer3"],
        "schedule_type": ["Yoga"],
      }, {
        "schedule_date": "2022-03-13",
        "studio_id": self.studio_id2,
      })
    backend.logout({}, g_session)
    result = backend.get_upcoming_schedules({
        "studio_id_list": [self.studio_id1, self.studio_id2],
        "date_list": ["2022-03-13", "2022-03-14"],
        "schedule_type": "Yoga",
      }, g_session)
    self.assertTrue(ERROR_KEY not in result)
    self.assertEqual(len(result["results"]), 2)
    self.assertEqual(result["results"][0]["date"], "2022-03-13")
    self.assertEqual(result["results"][1]["date"], "2022-03-14")
    self.assertEqual(len(result["results"][0]["schedules"]), 4)
    self.assertEqual(len(result["results"][1]["schedules"]), 2)
    self.assertEqual(result["results"][0]["schedules"][0], {
          'id': self.schedule_id1,
          'name': 'Slow Yoga',
          'start_time': '13:00',
          'end_time': '14:00',
          'schedule_date': '2022-03-13',
          'studio_id': self.studio_id1,
          'trainer': 'Trainer1',
          'schedule_type': 'Yoga',
          'num_bookings': 0,
          'capacity': 25,
          'address': '207 Euston Road',
          'studio_name': 'Kings Cross1'
        })

    self.assertTrue(IsDictSubsetList([
      dict(id=self.schedule_id1, start_time="13:00", studio_id=self.studio_id1),
      dict(id=self.schedule_id5, start_time="13:00", studio_id=self.studio_id2),
      dict(id=self.schedule_id2, start_time="17:00", studio_id=self.studio_id1),
      dict(id=self.schedule_id6, start_time="17:00", studio_id=self.studio_id2)
      ], result["results"][0]["schedules"]))

    self.assertTrue(IsDictSubsetList([
      dict(id=self.schedule_id3, start_time="13:00", studio_id=self.studio_id1),
      dict(id=self.schedule_id4, start_time="17:00", studio_id=self.studio_id1)
      ], result["results"][1]["schedules"]))


  def step_join_membership(self):
    for email, password in [("n1@g.com", "p1"), ("n2@g.com", "p2")]:
      self.login(email, password)
      info = {
        "membership_plan_id": self.mplan_id1,
        "card_number": "3383 4488 4470",
        "name": "Paul Yuna",
        "expiry": "02/25",
        "cvv": "344",
        "billing_address": "London",
        }
      result = backend.join_membership(info, g_session)
      self.assertTrue(ERROR_KEY not in result)
      self.assertEqual(result["status"], "Joined")

      result = backend.join_membership(info, g_session)
      self.assertTrue(ERROR_KEY in result)
      self.assertEqual(result[ERROR_KEY], 'You already have an active membership plan.')
    backend.logout({}, g_session)


  def step_book_schedule(self):
    result = backend.book_schedule(dict(schedule_id=self.schedule_id1), g_session)
    self.assertTrue(ERROR_KEY in result)
    self.assertTrue(result[ERROR_KEY], 'Someone must be logged in for this API')

    self.login("n3@g.com", "p3")
    result = backend.book_schedule(dict(schedule_id=self.schedule_id1), g_session)
    self.assertTrue(ERROR_KEY in result)
    self.assertTrue(result[ERROR_KEY], "You don't have active membership plan.")

    self.login("n2@g.com", "p2")
    result = backend.book_schedule(dict(schedule_id=self.schedule_id1), g_session)
    self.assertTrue(ERROR_KEY not in result)
    result = backend.book_schedule(dict(schedule_id=self.schedule_id2), g_session)
    self.assertTrue(ERROR_KEY not in result)

    self.login("n1@g.com", "p1")
    result = backend.book_schedule(dict(schedule_id=self.schedule_id1), g_session)
    self.assertTrue(ERROR_KEY not in result)

    backend.logout({}, g_session)
    result = backend.get_upcoming_schedules({
        "studio_id_list": [self.studio_id1],
        "date_list": ["2022-03-13"],
        "schedule_type": "Yoga",
      }, g_session)
    self.assertTrue(IsDictSubsetList([
        {"num_bookings": 2, "id": self.schedule_id1},
        {"num_bookings": 1, "id": self.schedule_id2}], result["results"][0]["schedules"]))

  def step_studio_checkin(self):
    self.login("n1@g.com", "p1")
    result = backend.get_studio_checkin_list(dict(schedule_id=self.schedule_id1), g_session)
    self.assertTrue(ERROR_KEY in result)
    self.assertEqual(result[ERROR_KEY], 'This API can be called only by STUDIO or ADMIN role.')

    self.login("studio@admin.com", "password")
    result = backend.get_studio_checkin_list(dict(schedule_id=self.schedule_id1), g_session)
    self.assertTrue(ERROR_KEY not in result)

    self.assertEqual(result["results"], [
      {"user_id": self.user1, "name": "Name1", "is_checked_in": False},
      {"user_id": self.user2, "name": "Name2", "is_checked_in": False}])

    result = backend.studio_checkin({"schedule_id": self.schedule_id1, "user_id": self.user1}, g_session)
    self.assertTrue(ERROR_KEY not in result)

    result = backend.get_studio_checkin_list(dict(schedule_id=self.schedule_id1), g_session)
    self.assertTrue(ERROR_KEY not in result)
    self.assertEqual(result["results"], [
      {"user_id": self.user1, "name": "Name1", "is_checked_in": True},
      {"user_id": self.user2, "name": "Name2", "is_checked_in": False}])


  def step_cancel_booking(self):
    self.login("n1@g.com", "p1")
    result = backend.cancel_booking(dict(schedule_id=self.schedule_id2), g_session)
    self.assertTrue(ERROR_KEY in result)
    self.assertTrue(result[ERROR_KEY], "You don't have active membership plan.")

    result = backend.cancel_booking(dict(schedule_id=self.schedule_id1), g_session)
    self.assertTrue(ERROR_KEY not in result)

    result = backend.get_upcoming_schedules({
        "studio_id_list": [self.studio_id1],
        "date_list": ["2022-03-13"],
        "schedule_type": "Yoga",
      }, g_session)
    self.assertTrue(IsDictSubsetList([
        {"num_bookings": 1, "id": self.schedule_id1},
        {"num_bookings": 1, "id": self.schedule_id2}], result["results"][0]["schedules"]))

    result = backend.book_schedule(dict(schedule_id=self.schedule_id2), g_session)
    self.assertTrue(ERROR_KEY not in result)


  def test_main(self):
    self.step_login_signup()
    self.step_membership_plans()
    self.step_studios()
    self.step_trainers()
    self.step_schedule_types()
    self.step_schedules()
    self.step_join_membership()
    self.step_book_schedule()
    self.step_studio_checkin()
    self.step_cancel_booking()


if __name__ == '__main__':
  unittest.main()
