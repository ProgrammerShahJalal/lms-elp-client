'use client'
import { useExamResultQuery, useGetSingleSubmissionExamQuery } from '@/redux/api/resultApi';
import { getUserInfo } from '@/services/auth.service';
import React from 'react';

const GiveBroadQuestionMark = ({ params }) => {
    const { id } = params;
    console.log(id, 'id');
    const { userId } = getUserInfo();
    const { data: singleExam } = useGetSingleSubmissionExamQuery(id)
    console.log(singleExam);
    // const { data } = useExamResultQuery();
    // const allExam = data?.exams?.data;
    // console.log(allExam);
    return (
        <div>
            <h1>Hello, This is new component</h1>
        </div>
    );
};

export default GiveBroadQuestionMark;