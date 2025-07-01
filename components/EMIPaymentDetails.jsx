import React, { useEffect, useState } from 'react';
import { HiDocumentDownload } from 'react-icons/hi';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import { BASE_URL } from '@/utils/apiClient';

const EMIPaymentDetails = ({
  userId,
  userEnrollment,
  emiPaymentProp,
  PaymentSuccessID,
  PaymentFailureID,
}) => {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const transactionId = localStorage.getItem('transactionID');
  const finaltransactionid = localStorage.getItem('razorpayPaymentIdfinal');
  const canceltransactionid = localStorage.getItem(
    'razorpayPaymentIdcanceltransactionid',
  );

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        if (!userId) {
          setLoading(false);
          return;
        }
        const response = await fetch(
          `${BASE_URL}/api/getpaymentstatus?userId=${userId}`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch payment details');
        }
        const data = await response.json();
        setPaymentData(data.courses || []);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, [userId]);

  if (loading) {
    return <p>Loading payment details...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div>
      <h2 className="md:text-xl text-lg font-jost font-medium">EMI Details</h2>
      <hr className="my-5" />
      <div className="w-full overflow-x-auto">
        <table className="table-auto text-center w-full text-base font-jost">
          <thead className="text-white">
            <tr className="border-gray-200">
              <th className="md:p-3 p-2 rounded-l-xl bg-[#AF8C3E] font-jost font-medium">
                S.No
              </th>
              <th className="md:p-3 p-2 bg-[#AF8C3E] font-jost font-medium">
                Date
              </th>
              <th className="md:p-3 p-2 bg-[#AF8C3E] font-jost font-medium">
                EMI
              </th>
              <th className="md:p-3 p-2 bg-[#AF8C3E] font-jost font-medium rounded-r-xl">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {userEnrollment.map((ele, index) => (
              <React.Fragment key={index}>
                {emiPaymentProp &&
                  emiPaymentProp.monthlyEMIArray.map((emiAmount, emiIndex) => {
                    const emiDate = new Date(ele.courseStartDate);
                    emiDate.setMonth(emiDate.getMonth() + emiIndex);
                    return (
                      <tr
                        key={`${index}-${emiIndex}`}
                        className="border-b border-gray-200"
                      >
                        <td className="p-2 md:p-3">{emiIndex + 1}</td>
                        <td className="p-2 md:p-3">
                          {emiDate.toLocaleDateString()}
                        </td>
                        <td className="p-2 md:p-3">{emiAmount}</td>
                        <td className="p-2 md:p-3">
                          {emiPaymentProp.nextEMI > 0 ? 'Failure' : 'Success'}
                        </td>
                      </tr>
                    );
                  })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EMIPaymentDetails;
