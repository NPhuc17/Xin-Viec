import React from 'react'
import { useParams } from 'react-router-dom';
import jobs from '../data/jobs.json';
import Navbar from '../components/navbar';

function Jobdetailpage() {
  const { id } = useParams();
  const job = jobs.find((j) => j.id === Number(id));

  if (!job) {
    return <div className="p-6">Không tìm thấy công việc.</div>;
  }

  return (
    <>
    <Navbar/>
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-700 mb-4">{job.description}</p>

      <div className="mb-4">
        <span className="font-semibold">Vị trí:</span> {job.position}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Địa điểm:</span>{' '}
        {job.location === 'hcm'
          ? 'TP HCM'
          : job.location === 'hn'
          ? 'Hà Nội'
          : 'Đà Nẵng'}
      </div>

      <h2 className="font-semibold text-lg mb-1">Yêu cầu:</h2>
      <ul className="list-disc ml-6 mb-4">
        {job.detail.requirement.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>

      <h2 className="font-semibold text-lg mb-1">Quyền lợi:</h2>
      <ul className="list-disc ml-6 mb-4">
        {job.detail.benefits.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>

      <h2 className="font-semibold text-lg mb-1">Mô tả chi tiết:</h2>
      <ul className="list-disc ml-6">
        {job.detail.description.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default Jobdetailpage