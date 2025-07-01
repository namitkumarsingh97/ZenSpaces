'use client';

import { useSearchParams } from 'next/navigation';
import { Typography, Button } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import jsPDF from 'jspdf';
import { useState, Suspense, useEffect } from 'react';
import 'jspdf-autotable';
import axios from 'axios';
import { BASE_URL } from '@/utils/apiClient';

const ThankYou = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  // useEffect(() => {
  //   const hasRefreshed = localStorage.getItem("thankYouRefreshed");

  //   if (!hasRefreshed) {
  //     localStorage.setItem("thankYouRefreshed", "true");
  //     window.location.reload();
  //   } else {
  //     localStorage.removeItem("thankYouRefreshed");
  //   }
  // }, []);

  const courseName = searchParams.get('courseName');
  const duration = searchParams.get('duration');
  const batch = searchParams.get('batch');
  const startDate = searchParams.get('startDate');
  const discountedFee = searchParams.get('discountedFee');
  const totalFee = searchParams.get('totalFee');
  const registrationAmount = searchParams.get('registrationAmount');
  const remainingFee = searchParams.get('remainingFee');
  const transactionID = searchParams.get('razorpayPaymentId');
  const customerName = searchParams.get('userName');

  const handleGoToMyAccount = () => {
    localStorage.setItem('transactionID', transactionID);
    router.push('/myaccount');
  };

  const downloadInvoice = () => {
    try {
      const transactionId = `INV-${new Date().getTime()}`;
      const doc = new jsPDF();

      const invoiceCourseName = courseName || 'N/A';
      const invoiceDiscountedFee = discountedFee || '0.00';
      const invoiceRegistrationAmount = registrationAmount || '0.00';
      const invoiceRemainingFee = remainingFee || '0.00';
      const invoiceStartDate = startDate || 'DD-MM-YYYY';

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
        'Flat No. C-108, Panchvati Co-operative Group Housing Society,  ',
        14,
        35,
      );
      doc.text('F Block, Vikaspuri', 14, 40);
      doc.text('Delhi, 110018', 14, 45);
      doc.text('GSTIN: 07AYBPS4080R1ZQ', 14, 50);

      doc.text(`Invoice#: ${transactionId}`, 150, 40);
      // doc.text(`Invoice Date: ${invoiceStartDate || 'N/A'}`, 150, 45);

      doc.text('Bill To:', 14, 60);
      doc.text(`${customerName}`, 14, 65);

      const headers = [['#', 'Item & Description', 'Qty', 'Amount']];
      const data = [
        [1, invoiceCourseName, '1.00', `₹${invoiceRegistrationAmount}`],
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
      doc.text(`Total: ₹${invoiceRegistrationAmount}`, 150, finalY + 10);

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
    } catch (error) {
      console.error('Error generating the invoice:', error);
      setErrorMessage('Error generating the invoice. Please try again.');
    }
  };

  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
  };

  const [userCourse, setUserCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/enrollmentbyuserid?userId=${userId}`,
        );
        console.log('response.data: ', response.data);
        setUserCourse(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    // if (userId) {
    fetchCourse();
    // }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // console.log('userCourse', userCourse);

  const pendingPayments = userCourse?.filter(
    (item) => item.paymentStatus !== 'pending',
  );
  console.log('pendingPayments: ', pendingPayments);

  const courseData = pendingPayments[0]?.courseId;
  console.log('courseData: ', courseData);

  const days = JSON.parse(courseData?.days[0]).join(', ');

  const formattedDate = new Date(courseData?.startDate).toLocaleDateString(
    'en-IN',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    },
  );

  return (
    <div className="w-full bg-black text-white">
      {/* Header Section */}
      <div className="w-full bg-cover flex items-center justify-center h-[37vh] bg-no-repeat bg-[url('/aboutbg.webp')]">
        <Typography className="font-ibarra xl:text-6xl md:text-5xl text-4xl mt-20">
          Thank You
        </Typography>
      </div>

      {/* Content Section */}
      <div className="w-full xl:max-w-[50%] max-w-[90%] flex flex-col gap-10 py-10 mx-auto">
        <Typography className="font-ibarra xl:text-5xl text-center md:text-4xl text-3xl">
          Payment Successful!
        </Typography>
        <Typography className="font-jost xl:text-xl text-center md:text-lg text-base">
          You’ll receive a confirmation email soon.
        </Typography>

        {/* Course Details */}
        <div className="border border-gray-700 p-5 rounded-lg mt-5">
          <Typography className="font-jost xl:text-lg text-base font-medium">
            {courseData?.name}
          </Typography>
          <Typography className="font-jost text-sm mt-2">
            Duration: {courseData?.duration}
          </Typography>
          <Typography className="font-jost text-sm">Batch: {days}</Typography>
          <Typography className="font-jost text-sm">
            Course Start Date: {formattedDate}
          </Typography>
          <Typography className="font-jost text-sm mt-2">
            Total Fee: {courseData?.totalFee} INR
          </Typography>
          <Typography className="font-jost text-sm mt-2">
            Discounted Fee: {courseData?.discountedFee} INR
          </Typography>
        </div>

        {/* Fee Details */}
        <div className="border border-gray-700 p-5 rounded-lg mt-5">
          <div className="flex justify-between">
            <Typography className="font-jost">Registration</Typography>
            <Typography className="font-jost">
              {courseData?.registrationAmount} INR
            </Typography>
          </div>
          <div className="flex justify-between">
            <Typography className="font-jost">Remaining Fee</Typography>
            <Typography className="font-jost">
              {`${courseData?.discountedFee - courseData?.registrationAmount}`}{' '}
              INR
            </Typography>
          </div>
          <Typography className="font-jost text-sm mt-2 text-red-500">
            Please pay the remaining fee 1 week before the course starting date.
          </Typography>
        </div>

        {/* Payment Details */}
        <div className="border border-gray-700 p-5 rounded-lg mt-5">
          <Typography className="font-jost text-sm">
            Transaction No.: {transactionID || 'Loading...'}
          </Typography>
        </div>

        {/* Buttons Section */}
        <div className="flex justify-between gap-5 mt-5">
          <Button
            className="w-full bg-[#AF8C3E] text-white py-2 px-4 rounded-lg hover:bg-[#d8ab67] transition duration-300"
            onClick={handleGoToMyAccount}
          >
            Go to My Account
          </Button>

          <Button color="gray" className="w-full" onClick={downloadInvoice}>
            Download Invoice
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYou />
    </Suspense>
  );
}
