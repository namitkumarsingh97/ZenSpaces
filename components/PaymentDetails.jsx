import React, { useEffect, useState } from 'react';
import { HiDocumentDownload } from 'react-icons/hi';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import { BASE_URL } from '@/utils/apiClient';

const PaymentDetails = ({ userId, enrollmentProp }) => {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const transactionId = localStorage.getItem('transactionID');
  const finaltransactionid = localStorage.getItem('razorpayPaymentIdfinal');
  const canceltransactionid = localStorage.getItem(
    'razorpayPaymentIdcanceltransactionid',
  );

  const customer_name = enrollmentProp[0]?.name || 'Customer';

  const filteredResponse = enrollmentProp?.filter(
    (item) => item.paymentStatus === 'EMI',
  );

  const filteredEMIDetails = filteredResponse.map(
    ({ emiDetails }) => emiDetails,
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

  // INVOICE REGISTRATION DOWNLOAD FUNCTIONALITY
  const downloadRegistrationInvoice = async (course) => {
    const { courseName, courseStartDate, registrationAmount, enrolledAt } =
      course;

    const response = await axios.get(`${BASE_URL}/api/enrollmentbyuserid`, {
      params: { userId },
    });
    const customerName = customer_name;

    const transactionId = `INV-${new Date().getTime()}`;
    const doc = new jsPDF();

    const dateObj = new Date(enrolledAt);
    const date = `${String(dateObj.getDate()).padStart(2, '0')}-${String(
      dateObj.getMonth() + 1,
    ).padStart(2, '0')}-${dateObj.getFullYear()}`;

    const logoURL = 'logo.webp';
    doc.addImage(logoURL, 'WEBP', 14, 10, 15, 15);

    doc.setFont('helvetica', 'bold', '#AF8C3E');
    doc.setFontSize(20);
    const pageWidth = doc.internal.pageSize.getWidth();
    const textX = pageWidth / 2;
    const textY = 20;
    doc.text('ASTROPATHWAYS', pageWidth / 2, 15, { align: 'center' });

    const invoiceY = textY + 5;
    doc.setFontSize(15);
    doc.text('INVOICE', textX, invoiceY, { align: 'center' });

    const invoiceWidth = doc.getTextWidth('INVOICE');
    const invoiceLineXStart = textX - invoiceWidth / 2;
    const invoiceLineXEnd = textX + invoiceWidth / 2;
    const invoiceLineY = invoiceY + 2;
    doc.line(invoiceLineXStart, invoiceLineY, invoiceLineXEnd, invoiceLineY);

    const contentStartY = invoiceLineY + 10;

    doc.setFontSize(10);
    doc.text(
      'Flat No. C-108, Panchvati Co-operating Group Housing Society,  ',
      14,
      contentStartY + 0,
    );
    doc.text('F Block, Vikaspuri', 14, contentStartY + 5);
    doc.text('Delhi, 110018', 14, contentStartY + 10);
    doc.text('GSTIN: 07AYBPS4080R1ZQ', 14, contentStartY + 15);

    doc.text(`Invoice#: ${transactionId}`, 150, contentStartY + 5);
    doc.text(`Invoice Date: ${date || 'N/A'}`, 150, contentStartY + 10);

    doc.text('Bill To:', 14, contentStartY + 20);
    doc.text(customerName || 'N/A', 14, contentStartY + 25);

    const headers = [
      [
        '#',
        'Item & Description',
        'Qty',
        'Course Start Date',
        'Registration Amount',
        'Payment Status',
      ],
    ];
    const data = [
      [
        1,
        courseName || 'N/A',
        '1.00',
        `${courseStartDate}`,
        `Rs. ${registrationAmount || '0.00'}`,
        `Registration Amount Paid`,
      ],
    ];

    doc.autoTable({
      head: headers,
      body: data,
      startY: contentStartY + 40,
      styles: { font: 'helvetica', fontSize: 10 },
      theme: 'grid',
      headStyles: {
        fillColor: [175, 140, 62],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
    });

    const finalY = doc.lastAutoTable.finalY || contentStartY + 40;
    doc.text(`Total: Rs. ${registrationAmount || '0.00'}`, 150, finalY + 10);

    doc.setFontSize(10);
    doc.text('Thanks for enrolling.', 14, finalY + 30);
    doc.text('Terms & Conditions:', 14, finalY + 35);
    doc.text(
      'Full payment is due upon receipt of this invoice.',
      14,
      finalY + 40,
    );
    doc.text(
      'Late payments may incur additional charges or interest as per applicable laws.',
      14,
      finalY + 45,
    );

    doc.setFontSize(8);
    doc.text(
      'This is a Computer Generated Invoice.',
      pageWidth / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' },
    );

    doc.save(`registration_amount_invoice-${transactionId}.pdf`);
  };

  // INVOICE DOWNLOAD FUNCTIONALITY
  const downloadInvoice = async (course) => {
    const { courseName, courseStartDate, discountCost, enrolledAt } = course;

    const response = await axios.get(`${BASE_URL}/api/enrollmentbyuserid`, {
      params: { userId },
    });
    const customerName = customer_name;

    const transactionId = `INV-${new Date().getTime()}`;
    const doc = new jsPDF();

    const dateObj = new Date(enrolledAt);
    const date = `${String(dateObj.getDate()).padStart(2, '0')}-${String(
      dateObj.getMonth() + 1,
    ).padStart(2, '0')}-${dateObj.getFullYear()}`;

    const logoURL = 'logo.webp';
    doc.addImage(logoURL, 'WEBP', 14, 10, 15, 15);

    doc.setFont('helvetica', 'bold', '#AF8C3E');
    doc.setFontSize(20);
    const pageWidth = doc.internal.pageSize.getWidth();
    const textX = pageWidth / 2;
    const textY = 20;
    doc.text('ASTROPATHWAYS', pageWidth / 2, 15, { align: 'center' });

    const invoiceY = textY + 5;
    doc.setFontSize(15);
    doc.text('INVOICE', textX, invoiceY, { align: 'center' });

    const invoiceWidth = doc.getTextWidth('INVOICE');
    const invoiceLineXStart = textX - invoiceWidth / 2;
    const invoiceLineXEnd = textX + invoiceWidth / 2;
    const invoiceLineY = invoiceY + 2;
    doc.line(invoiceLineXStart, invoiceLineY, invoiceLineXEnd, invoiceLineY);

    doc.setFontSize(10);
    doc.text(
      'Flat No. C-108, Panchvati Co-operating Group Housing Society,  ',
      14,
      35,
    );
    doc.text('F Block, Vikaspuri', 14, 40);
    doc.text('Delhi, 110018', 14, 45);
    doc.text('GSTIN: 07AYBPS4080R1ZQ', 14, 50);

    doc.text(`Invoice#: ${transactionId}`, 150, 40);
    doc.text(`Invoice Date: ${date || 'N/A'}`, 150, 45);

    doc.text('Bill To:', 14, 60);
    doc.text(customerName || 'N/A', 14, 65);

    const headers = [
      [
        '#',
        'Item & Description',
        'Qty',
        'Course Start Date',
        'Amount',
        'Payment Status',
      ],
    ];
    const data = [
      [
        1,
        courseName || 'N/A',
        '1.00',
        `${courseStartDate}`,
        `Rs. ${discountCost || '0.00'}`,
        `Total Amount Paid`,
      ],
    ];

    doc.autoTable({
      head: headers,
      body: data,
      startY: 80,
      styles: { font: 'helvetica', fontSize: 10 },
      theme: 'grid',
      headStyles: {
        fillColor: [175, 140, 62],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
    });

    const finalY = doc.lastAutoTable.finalY || 80;
    doc.text(`Total: Rs. ${discountCost || '0.00'}`, 150, finalY + 10);

    doc.setFontSize(10);
    doc.text('Thank you.', 14, finalY + 30);

    doc.setFontSize(8);
    doc.text(
      'This is a Computer Generated Invoice.',
      pageWidth / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' },
    );

    doc.save(`full_amount_invoice-${transactionId}.pdf`);
  };

  // EMI INVOICE DOWNLOAD FUNCTIONALITY
  const downloadEMIInvoice = async (course, emiDetails) => {
    const flattenedEMIDetails = Array.isArray(emiDetails[0])
      ? emiDetails[0]
      : emiDetails;

    const { courseName, courseStartDate, discountCost, enrolledAt } = course;
    const customerName = customer_name;

    const transactionId = `EMI-${new Date().getTime()}`;
    const doc = new jsPDF();

    const dateObj = new Date(enrolledAt);
    const date = `${String(dateObj.getDate()).padStart(2, '0')}-${String(
      dateObj.getMonth() + 1,
    ).padStart(2, '0')}-${dateObj.getFullYear()}`;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.text('ASTROPATHWAYS', pageWidth / 2, 15, { align: 'center' });

    doc.setFontSize(15);
    doc.text('EMI INVOICE', pageWidth / 2, 25, { align: 'center' });

    doc.setFontSize(10);
    doc.text(`Invoice#: ${transactionId}`, 150, 40);
    doc.text(`Invoice Date: ${date || 'N/A'}`, 150, 45);

    doc.text('Bill To:', 14, 60);
    doc.text(customerName || 'N/A', 14, 65);

    const headers = [['#', 'EMI Number', 'Due Date', 'Amount', 'Status']];

    // Use the corrected emiDetails array
    const data = flattenedEMIDetails.map((emi, index) => [
      index + 1,
      `EMI-${emi.emiNumber}`,
      new Date(emi.dueDate).toDateString(),
      `Rs. ${emi.amount.toFixed(2)}`,
      emi.status,
    ]);

    doc.autoTable({
      head: headers,
      body: data,
      startY: 80,
      styles: { font: 'helvetica', fontSize: 10 },
      theme: 'grid',
      headStyles: {
        fillColor: [175, 140, 62],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
    });

    const finalY = doc.lastAutoTable.finalY || 80;
    const totalPaid = flattenedEMIDetails
      .filter((emi) => emi.status === 'Paid')
      .reduce((sum, emi) => sum + emi.amount, 0);
    const remainingBalance = flattenedEMIDetails
      .filter((emi) => emi.status === 'Pending')
      .reduce((sum, emi) => sum + emi.amount, 0);

    doc.text(
      `Total Course Cost: Rs. ${discountCost || '0.00'}`,
      150,
      finalY + 10,
    );
    doc.text(`Total Paid: Rs. ${totalPaid.toFixed(2)}`, 150, finalY + 15);
    doc.text(
      `Remaining Balance: Rs. ${remainingBalance.toFixed(2)}`,
      150,
      finalY + 20,
    );

    doc.setFontSize(8);
    doc.text(
      'This is a Computer Generated Invoice.',
      pageWidth / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' },
    );

    doc.save(`emi_invoice-${transactionId}.pdf`);
  };

  return (
    <div>
      <h2 className="md:text-xl text-lg font-jost font-medium">
        Payment Details
      </h2>
      <hr className="my-5" />
      <div className="w-full overflow-x-auto">
        <table className="table-auto text-center w-full text-base font-jost">
          <thead className="text-white">
            <tr className="border-gray-200">
              <th className="md:p-3 p-2 rounded-l-xl bg-[#AF8C3E] font-jost font-medium">
                S.No
              </th>
              {/*               <th className="md:p-3 p-2 bg-[#AF8C3E] font-jost font-medium">
                Transaction Id
              </th> */}
              <th className="md:p-3 p-2 bg-[#AF8C3E] font-jost font-medium">
                Course Name
              </th>
              <th className="md:p-3 p-2 bg-[#AF8C3E] font-jost font-medium">
                Date
              </th>
              <th className="md:p-3 p-2 bg-[#AF8C3E] font-jost font-medium">
                Time
              </th>
              <th className="md:p-3 p-2 bg-[#AF8C3E] font-jost font-medium">
                Status
              </th>
              <th className="md:p-3 p-2 rounded-r-xl bg-[#AF8C3E] font-jost font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paymentData
              .filter((course) => course.paymentStatus !== 'pending')
              .map((course, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-2 md:p-3">{index + 1}</td>
                  {/*                   <td className="p-2 md:p-3">
                    {course.paymentStatus === 'Paid'
                      ? finaltransactionid
                      : course.paymentStatus === 'pending'
                      ? canceltransactionid
                      : transactionId}
                  </td> */}
                  <td className="p-2 md:p-3">{course.courseName}</td>
                  <td className="p-2 md:p-3">
                    {new Date(course.courseStartDate).toLocaleDateString()}
                  </td>
                  <td className="p-2 md:p-3">
                    {new Date(course.enrolledAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="p-2 md:p-3">{course.paymentStatus}</td>
                  <td className="p-2 text-center md:p-3">
                    {course.paymentStatus === 'registrationAmountPaid' && (
                      <HiDocumentDownload
                        title="Registration Amount Invoice"
                        className="h-5 w-5 cursor-pointer"
                        onClick={() => downloadRegistrationInvoice(course)}
                      />
                    )}
                    {course.paymentStatus === 'Paid' && (
                      <div className="flex">
                        <HiDocumentDownload
                          title="Registration Amount Invoice"
                          className="h-5 w-5 cursor-pointer"
                          onClick={() => downloadRegistrationInvoice(course)}
                        />
                        <HiDocumentDownload
                          title="Full Amount Invoice"
                          className="h-5 w-5 cursor-pointer"
                          onClick={() => downloadInvoice(course)}
                        />
                      </div>
                    )}
                    {course.paymentStatus === 'EMI' && (
                      <div className="flex">
                        <HiDocumentDownload
                          title="Registration Amount Invoice"
                          className="h-5 w-5 cursor-pointer"
                          onClick={() => downloadRegistrationInvoice(course)}
                        />
                        <HiDocumentDownload
                          title="EMI Invoice"
                          className="h-5 w-5 cursor-pointer"
                          onClick={() =>
                            downloadEMIInvoice(course, filteredEMIDetails)
                          }
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentDetails;
