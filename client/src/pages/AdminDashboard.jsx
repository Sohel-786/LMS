import { useDispatch, useSelector } from 'react-redux';
import HomeLayout from '../layouts/HomeLayout';
import { useNavigate } from 'react-router-dom';
import { getPaymentRecords } from '../redux/slices/paymentSlice';
import { getStatsData } from '../redux/slices/statsSlice';
import { useEffect } from 'react';
import { getAllCourses } from '../redux/slices/courseSlice';

function AdminDashboard(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { allUserCount, subscriberCount } = useSelector((s) => s?.stat);
    const { allPayments, finalMonths, monthlySalesRecord } = useSelector((s) => s?.payment)
    const courses = useSelector((s) => s?.course?.courseData);

    async function load(){
        await dispatch(getPaymentRecords());
        await dispatch(getStatsData());
        await dispatch(getAllCourses())
    }

    useEffect(() => {
        load();
    }, []);

    return(
        <HomeLayout>

        </HomeLayout>
    )
}