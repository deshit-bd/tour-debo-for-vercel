import { NextResponse } from 'next/server';

let currentBalance = 500;
let pointsHistory = [
  { points: '+50', details: 'Welcome Bonus', startDate: '02-02-2026', expiredDate: '02-04-2026', balance: '50', type: 'credit' },
  { points: '+200', details: 'Referral Reward (+৳500 Voucher)', startDate: '02-03-2026', expiredDate: '02-06-2026', balance: '250', type: 'credit' },
  { points: '+200', details: 'Referral Reward (+৳500 Voucher)', startDate: '05-03-2026', expiredDate: '02-06-2026', balance: '450', type: 'credit' },
  { points: '+50', details: 'Package Review', startDate: '08-03-2026', expiredDate: '02-06-2026', balance: '500', type: 'credit' },
];

let referralStats = {
  referralCode: 'TOUR-SANJID-9921',
  referralLink: 'https://tour-dibo.com/referral?code=TOUR-SANJID-9921',
  totalInvited: 12,
  successfulReferrals: 9,
  pendingSignups: 3,
  totalPointsEarned: 1800,
  totalCouponsEarned: 9,
  totalDiscountValue: 4500,
  activeRewardCoupons: [
    { code: 'REF-REWARD-500', amount: '৳500 OFF', title: 'Referral Winner Reward Voucher', validTill: '31 Dec 2026', minSpend: 'Min Spend ৳2,000' },
    { code: 'REF-FRIEND-500', amount: '৳500 OFF', title: 'Friend Welcome Referral Voucher', validTill: '31 Dec 2026', minSpend: 'Min Spend ৳2,000' }
  ],
  milestones: [
    { tier: 1, target: 3, reward: '৳500 Coupon + 500 Bonus Pts', claimed: true, title: 'Bronze Ambassador' },
    { tier: 2, target: 10, reward: '৳1,000 Cash Voucher + VIP Silver Badge', claimed: false, title: 'Silver Ambassador' },
    { tier: 3, target: 25, reward: '৳3,000 Cash Voucher + Gold Legend Badge', claimed: false, title: 'Gold Legend' },
  ],
  friendsList: [
    { id: 1, name: 'Tanvir Hossain', email: 'tanvir.h@gmail.com', date: '10 Aug 2026', status: 'COMPLETED', reward: '৳500 Voucher + 200 Pts', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80' },
    { id: 2, name: 'Anika Bushra', email: 'anika.b@yahoo.com', date: '08 Aug 2026', status: 'COMPLETED', reward: '৳500 Voucher + 200 Pts', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80' },
    { id: 3, name: 'Sajid Islam', email: 'sajid.is@gmail.com', date: '05 Aug 2026', status: 'COMPLETED', reward: '৳500 Voucher + 200 Pts', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80' },
    { id: 4, name: 'Nusrat Jahan', email: 'nusrat.j@gmail.com', date: '02 Aug 2026', status: 'PENDING', reward: 'Pending Booking', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80' },
    { id: 5, name: 'Mahmudur Rahman', email: 'mahmud.r@gmail.com', date: '28 Jul 2026', status: 'COMPLETED', reward: '৳500 Voucher + 200 Pts', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80' },
  ]
};

const PROMO_CODES = {
  'TOURDIBO100': 100,
  'WELCOME50': 50,
  'VIP200': 200,
  'EID2026': 150
};

export async function GET() {
  return NextResponse.json({
    success: true,
    points: currentBalance,
    history: pointsHistory,
    referral: referralStats,
    visits: { sea: 4, abroad: 2, riverHill: 3 },
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, voucherCode, friendEmail, tierId } = body;

    if (action === 'SEND_REFERRAL_INVITE') {
      if (!friendEmail || !friendEmail.includes('@')) {
        return NextResponse.json({ success: false, message: 'Please enter a valid email address.' }, { status: 400 });
      }

      currentBalance += 200;
      const todayStr = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
      
      const newFriend = {
        id: Date.now(),
        name: friendEmail.split('@')[0],
        email: friendEmail,
        date: 'Just Now',
        status: 'COMPLETED',
        reward: '৳500 Voucher + 200 Pts',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80'
      };

      referralStats.friendsList.unshift(newFriend);
      referralStats.totalInvited += 1;
      referralStats.successfulReferrals += 1;
      referralStats.totalPointsEarned += 200;
      referralStats.totalCouponsEarned += 1;
      referralStats.totalDiscountValue += 500;

      const newHistoryItem = {
        points: '+200',
        details: `Referral Reward & ৳500 Coupon (${friendEmail})`,
        startDate: todayStr,
        expiredDate: '31-12-2026',
        balance: currentBalance.toString(),
        type: 'credit',
      };

      pointsHistory = [newHistoryItem, ...pointsHistory];

      return NextResponse.json({
        success: true,
        message: `🎉 Success! Sent ৳500 Welcome Coupon to ${friendEmail}! You unlocked a ৳500 Reward Coupon + 200 Bonus Points!`,
        points: currentBalance,
        history: pointsHistory,
        referral: referralStats,
      });
    }

    if (action === 'CLAIM_MILESTONE') {
      const milestone = referralStats.milestones.find(m => m.tier === tierId);
      if (milestone && !milestone.claimed && referralStats.successfulReferrals >= milestone.target) {
        milestone.claimed = true;
        currentBalance += 500;
        const newHistoryItem = {
          points: '+500',
          details: `Milestone Reward (${milestone.title})`,
          startDate: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
          expiredDate: '31-12-2026',
          balance: currentBalance.toString(),
          type: 'credit',
        };
        pointsHistory = [newHistoryItem, ...pointsHistory];

        return NextResponse.json({
          success: true,
          message: `🏆 Milestone Claimed! ৳1,000 Cash Voucher + 500 Bonus Points added to your wallet!`,
          points: currentBalance,
          history: pointsHistory,
          referral: referralStats,
        });
      } else {
        return NextResponse.json({ success: false, message: 'Milestone requirements not met or already claimed.' }, { status: 400 });
      }
    }

    if (action === 'APPLY_VOUCHER') {
      const cleanCode = voucherCode?.trim().toUpperCase();
      const bonusAmount = PROMO_CODES[cleanCode];

      if (bonusAmount) {
        currentBalance += bonusAmount;
        const newRecord = {
          points: `+${bonusAmount}`,
          details: `Promo Code (${cleanCode})`,
          startDate: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
          expiredDate: '31-12-2026',
          balance: currentBalance.toString(),
          type: 'credit',
        };
        pointsHistory = [newRecord, ...pointsHistory];
        return NextResponse.json({
          success: true,
          message: `🎉 Promo Code "${cleanCode}" Applied! +${bonusAmount} Bonus Points added to your balance!`,
          points: currentBalance,
          history: pointsHistory,
        });
      } else {
        return NextResponse.json({ success: false, message: '❌ Invalid or expired promo voucher code. (Try code: TOURDIBO100 or VIP200)' }, { status: 400 });
      }
    }

    if (action === 'REDEEM_POINTS') {
      if (currentBalance >= 200) {
        currentBalance -= 200;
        const generatedCode = `DISC500-${Math.floor(1000 + Math.random() * 9000)}`;
        const newRecord = {
          points: '-200',
          details: `Redeemed Voucher (${generatedCode} - ৳500 Off)`,
          startDate: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
          expiredDate: '-',
          balance: currentBalance.toString(),
          type: 'debit',
        };
        pointsHistory = [newRecord, ...pointsHistory];
        return NextResponse.json({
          success: true,
          message: `🎉 Success! 200 Points converted to ৳500 Discount Voucher (Code: ${generatedCode}). Saved to your wallet!`,
          points: currentBalance,
          history: pointsHistory,
          generatedCode,
        });
      } else {
        return NextResponse.json({ success: false, message: '❌ Insufficient points balance! Minimum 200 points required.' }, { status: 400 });
      }
    }

    return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
