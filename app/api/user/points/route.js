import { NextResponse } from 'next/server';

let currentBalance = 500;
let pointsHistory = [
  { points: '+50', details: 'Welcome', startDate: '02-02-24', expiredDate: '02-04-2024', balance: '50', type: 'credit' },
  { points: '+100', details: 'Refer', startDate: '02-03-2024', expiredDate: '02-06-2024', balance: '150', type: 'credit' },
  { points: '+50', details: 'Review', startDate: '02-03-2024', expiredDate: '02-06-2024', balance: '200', type: 'credit' },
  { points: '-50', details: 'Expired', startDate: '02-06-2024', expiredDate: '-', balance: '150', type: 'debit' },
  { points: '-150', details: 'Booking', startDate: '03-06-2024', expiredDate: '-', balance: '00', type: 'debit' },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    points: currentBalance,
    history: pointsHistory,
    visits: { sea: 4, abroad: 2, riverHill: 3 },
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, voucherCode } = body;

    if (action === 'APPLY_VOUCHER') {
      if (voucherCode?.trim().toUpperCase() === 'TOURDIBO100') {
        currentBalance += 100;
        const newRecord = {
          points: '+100',
          details: 'Voucher Code (TOURDIBO100)',
          startDate: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
          expiredDate: '02-10-2026',
          balance: currentBalance.toString(),
          type: 'credit',
        };
        pointsHistory = [newRecord, ...pointsHistory];
        return NextResponse.json({
          success: true,
          message: '🎉 Voucher applied! 100 bonus points added to your balance.',
          points: currentBalance,
          history: pointsHistory,
        });
      } else {
        return NextResponse.json({ success: false, message: '❌ Invalid voucher code.' }, { status: 400 });
      }
    }

    if (action === 'REDEEM_POINTS') {
      if (currentBalance >= 200) {
        currentBalance -= 200;
        const newRecord = {
          points: '-200',
          details: 'Redeem (৳500 Discount)',
          startDate: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
          expiredDate: '-',
          balance: currentBalance.toString(),
          type: 'debit',
        };
        pointsHistory = [newRecord, ...pointsHistory];
        return NextResponse.json({
          success: true,
          message: '✓ 200 Points redeemed for ৳500 Discount Voucher!',
          points: currentBalance,
          history: pointsHistory,
        });
      } else {
        return NextResponse.json({ success: false, message: '❌ Insufficient points balance.' }, { status: 400 });
      }
    }

    return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
