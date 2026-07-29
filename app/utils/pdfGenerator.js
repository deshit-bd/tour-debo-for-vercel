'use client';

export async function generateTicketPDF(bookingData = {}) {
  try {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const title = bookingData.title || 'Paris City of Love Tour';
    const refNo = bookingData.refNo || 'TD-' + Math.floor(100000 + Math.random() * 900000);
    const date = bookingData.date || '27-29 June, 2026';
    const amount = bookingData.amount || '$200.00';
    const touristName = bookingData.touristName || 'Hi, Username';

    // Header Background Accent (Sapphire Ocean Blue)
    doc.setFillColor(11, 87, 208);
    doc.rect(0, 0, 210, 40, 'F');

    // Title Brand
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('TOUR DIBO - OFFICIAL TRAVEL TICKET', 15, 22);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Verified E-Voucher & Tour Pass', 15, 30);

    // Booking Details Section
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Booking Details', 15, 55);

    doc.setLineWidth(0.5);
    doc.setDrawColor(226, 232, 240);
    doc.line(15, 60, 195, 60);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    doc.setFont('helvetica', 'bold');
    doc.text('Booking Reference:', 15, 72);
    doc.setFont('helvetica', 'normal');
    doc.text(refNo, 65, 72);

    doc.setFont('helvetica', 'bold');
    doc.text('Tourist Name:', 15, 82);
    doc.setFont('helvetica', 'normal');
    doc.text(touristName, 65, 82);

    doc.setFont('helvetica', 'bold');
    doc.text('Tour Package:', 15, 92);
    doc.setFont('helvetica', 'normal');
    doc.text(title, 65, 92);

    doc.setFont('helvetica', 'bold');
    doc.text('Travel Dates:', 15, 102);
    doc.setFont('helvetica', 'normal');
    doc.text(date, 65, 102);

    doc.setFont('helvetica', 'bold');
    doc.text('Total Paid:', 15, 112);
    doc.setTextColor(11, 87, 208);
    doc.setFont('helvetica', 'bold');
    doc.text(amount, 65, 112);

    // Included Benefits Box
    doc.setFillColor(241, 245, 249);
    doc.rect(15, 125, 180, 45, 'F');
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Included Package Services:', 22, 137);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('• Roundtrip Transit & Airport Transfers', 22, 147);
    doc.text('• 4-Star Hotel Accommodation & Daily Breakfast', 22, 154);
    doc.text('• Certified Local Tour Guide & Priority Museum Passes', 22, 161);

    // QR Code Placeholder Card
    doc.setDrawColor(11, 87, 208);
    doc.setFillColor(232, 240, 254);
    doc.rect(15, 182, 180, 35, 'FD');

    doc.setTextColor(11, 87, 208);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('PASS CODE: ' + refNo + ' [VERIFIED]', 22, 195);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Please present this PDF voucher or digital QR at hotel check-in & tour boarding point.', 22, 204);

    // Footer Copyright
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(9);
    doc.text('Generated via Tour Dibo Experience Platform • www.tourdibo.com', 15, 280);

    // Save PDF Download
    doc.save(`TourDibo_Voucher_${refNo}.pdf`);
  } catch (err) {
    console.error('PDF generation error:', err);
    window.print();
  }
}
