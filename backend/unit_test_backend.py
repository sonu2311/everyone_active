#!/usr/bin/env python3

import unittest
import sys
import backend
import time

g_session = {}

tables = ["users", "membership_plans" ]
ADMIN = "ADMIN"
ERROR_KEY = "error"

flags = ["--clean_database_at_start", '--dont_clean_database_at_end']
# flags = []

db = backend.db

def GetPartialDict(d, keys):
  return dict((key, d[key]) for key in keys)

def IsDictSubset(d1, d2):
  for k, v in d1.items():
    if k not in d2 or d2[k] != v:
      return False
  return True


class TestStringMethods(unittest.TestCase):

  @classmethod
  def setUpClass(cls):
    if "--clean_database_at_start" in flags:
      cls.cleanDatabase()
    for table in tables:
      query = f"SELECT count(*) as num from {table}" + (" WHERE role != 'ADMIN'" if table == "users" else "")
      assert db.readQuery(query)[0]["num"] == 0, f"Table {table} should not have data when running these unittests. Drop all tables and recreate them again to reach at clean stage."

  @classmethod
  def cleanDatabase(cls):
    for table in tables:
      query = f"DELETE from {table}" + (" WHERE role != 'ADMIN'" if table == "users" else "")
      db.writeQuery(query)

  @classmethod
  def tearDownClass(cls):
    if '--dont_clean_database_at_end' not in flags:
      cls.cleanDatabase()

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

  def step_membership_plans(self):
    info1 = {
        "name": "Monthly Plan", "price": 3939, "terms_and_conditions": "..",
        "payment_frequency": "MONTHLY", "expiry_duration": 5,
        "expiry_duration_unit": "MONTH"}
    info2 = {
        "name": "Monthly Plan2", "price": 39439, "terms_and_conditions": "...",
        "payment_frequency": "MONTHLY", "expiry_duration": 45,
        "expiry_duration_unit": "MONTH"}
    info3 = {
        "name": "Monthly Plan3", "price": 394391, "terms_and_conditions": "...",
        "payment_frequency": "MONTHLY", "expiry_duration": 45,
        "expiry_duration_unit": "MONTH"}
    self.login("admin@admin.com", "password")
    result = backend.add_membership_plan(info1, g_session)
    self.assertTrue(ERROR_KEY not in result)
    self.mplan_id1 = result["id"]

    result = backend.add_membership_plan(info2, g_session)
    self.assertTrue(ERROR_KEY not in result)
    self.mplan_id2 = result["id"]

    result = backend.add_membership_plan(info3, g_session)
    self.assertTrue(ERROR_KEY not in result)
    self.mplan_id3_to_delete = result["id"]

    result = backend.get_all_membership_plans({}, g_session)
    self.assertTrue(ERROR_KEY not in result)
    self.assertEqual(len(result["membership_plans"]), 3)
    self.assertEqual(result["membership_plans"][0]["id"], self.mplan_id3_to_delete)
    self.assertEqual(result["membership_plans"][1]["id"], self.mplan_id2)
    self.assertEqual(result["membership_plans"][2]["id"], self.mplan_id1)
    self.assertTrue(IsDictSubset(info3, result["membership_plans"][0]))
    self.assertTrue(IsDictSubset(info2, result["membership_plans"][1]))
    self.assertTrue(IsDictSubset(info1, result["membership_plans"][2]))

    info = dict(info3)
    info["id"] = self.mplan_id3_to_delete
    info["price"] = 100

    result = backend.update_membership_plan(info, g_session)
    self.assertTrue(ERROR_KEY not in result)
    result = backend.get_all_membership_plans({}, g_session)
    self.assertTrue(ERROR_KEY not in result)
    self.assertEqual(len(result["membership_plans"]), 3)
    self.assertEqual(result["membership_plans"][0]["id"], self.mplan_id3_to_delete)
    self.assertTrue(IsDictSubset(info, result["membership_plans"][0]))
    self.assertTrue(IsDictSubset(info2, result["membership_plans"][1]))
    self.assertTrue(IsDictSubset(info1, result["membership_plans"][2]))

    result = backend.delete_membership_plan({"id": self.mplan_id3_to_delete}, g_session)
    self.assertTrue(ERROR_KEY not in result)
    result = backend.get_all_membership_plans({}, g_session)
    self.assertTrue(ERROR_KEY not in result)
    self.assertEqual(len(result["membership_plans"]), 2)
    self.assertTrue(IsDictSubset(info2, result["membership_plans"][0]))
    self.assertTrue(IsDictSubset(info1, result["membership_plans"][1]))


  def login(self, email, password):
    result = backend.login(dict(email=email, password=password), g_session)
    self.assertTrue(ERROR_KEY not in result)
    return result


  def test_main(self):
    self.step_login_signup()
    self.step_membership_plans()


if __name__ == '__main__':
  unittest.main()
