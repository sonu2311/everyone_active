import Example1 from './example1';
import Example2 from './example2';
import Example3 from './example3';
import {Routes, Route, HashRouter} from "react-router-dom"
import React from 'react';
import Login from './login';
import Signup from './signup';
import ForgotPassword from './forgot_password';
import ResetPassword from './reset_password';
import AdminAllUsers from './admin_all_users';
import EditProfile from './profile_page';
import AdminManageMemberships from './Admin_manage_memberships';
import AdminManageStudio from './Admin_manage_studio';
import AddStudio from './add_studio';
import AdminTrainersAndScheduleTypePage from './Admin_trainers_and_schedule_type_page';
import AdminManageSchedulePage from './Admin_manage_schedule_page';
import PricePlanPage from './Price_plan_page';
import MembershipJoinPage from './Membership_join_page';
import ScheduleBookingPage from './Schedule_Booking_Page';
import StudioCheckInPage from './Studio_check_in_page';
import StudioSelectScheduleAndDate from './Studio_select_schedule_and_date';

function MainFunc() {
  return (
    <HashRouter>
      <Routes>
        <Route >
          <Route path="/" element={<Example1 />} />
          <Route path="/example1" element={<Example1 />} />
          <Route path="/example2" element={<Example2 />} />
          <Route path="/example3" element={<Example3 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/admin_all_users" element={<AdminAllUsers />} />
          <Route path="/profile_page/:id" element={<EditProfile/>} />
          <Route path="/Admin_manage_memberships" element={<AdminManageMemberships/>} />
          <Route path="/Admin_manage_studio" element={<AdminManageStudio/>} />         
          <Route path="/add_studio" element={<AddStudio/>} />
          <Route path="/Admin_trainers_and_schedule_type_page" element={<AdminTrainersAndScheduleTypePage/>} />
          <Route path="/Admin_manage_schedule_page" element={<AdminManageSchedulePage/>} />
          <Route path="/Price_plan_page" element={<PricePlanPage/>} />
          <Route path="/Membership_join_page/:id" element={<MembershipJoinPage/>} />
          <Route path="/Schedule_Booking_Page" element={<ScheduleBookingPage/>} />
          <Route path="/Studio_select_schedule_and_date" element={<StudioSelectScheduleAndDate/>} />
          <Route path="/Studio_check_in_page/:scheduleDate/:schedule_type/:studioId" element={<StudioCheckInPage/>} />
          
          <Route path="*" element={<h1>Invalid</h1>} />
        </Route>
      </Routes>
    </HashRouter>);
}

export default MainFunc;
