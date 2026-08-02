import { NextResponse } from 'next/server';

export async function GET() {
  const BANGLADESH_DATA = {
    Dhaka: {
      Dhaka: {
        Dhanmondi: ['Dhanmondi TSO (1205)', 'Dhanmondi R/A (1209)'],
        Gulshan: ['Gulshan Model Town (1212)', 'Gulshan-2 (1213)'],
        Uttara: ['Uttara Sector 4 (1230)', 'Uttara Sector 11 (1231)'],
        Mirpur: ['Mirpur-1 (1216)', 'Mirpur-10 (1216)'],
        Tejgaon: ['Tejgaon Industrial Area (1208)', 'Kawran Bazar (1215)'],
        Mohammadpur: ['Mohammadpur (1207)', 'Kazi Nazrul Islam Road (1207)'],
      },
      Gazipur: {
        'Gazipur Sadar': ['Gazipur Sadar (1700)', 'Chowrasta (1702)'],
        Kaliakair: ['Kaliakair (1750)', 'Chandra (1751)'],
        Sreepur: ['Sreepur (1740)', 'Maona (1741)'],
      },
      Narayanganj: {
        'Narayanganj Sadar': ['Narayanganj Head Office (1400)'],
        Siddhirganj: ['Siddhirganj (1430)'],
        Sonargaon: ['Sonargaon (1440)'],
      },
      Tangail: {
        'Tangail Sadar': ['Tangail Sadar (1900)'],
        Mirzapur: ['Mirzapur (1940)'],
        Kalihati: ['Kalihati (1970)'],
      },
      Faridpur: {
        'Faridpur Sadar': ['Faridpur Head Office (7800)'],
        Bhanga: ['Bhanga (7830)'],
      },
    },
    Chattogram: {
      Chittagong: {
        Panchlaish: ['Panchlaish (4000)', 'GEC (4001)'],
        Kotwali: ['Chittagong GPO (4000)', 'New Market (4002)'],
        Halishahar: ['Halishahar (4216)'],
        Agrabad: ['Agrabad Commercial Area (4100)'],
      },
      "Cox's Bazar": {
        "Cox's Bazar Sadar": ['Coxs Bazar Sadar (4700)'],
        Teknaf: ['Teknaf (4790)'],
        Ukhiya: ['Ukhiya (4750)'],
      },
      Comilla: {
        'Comilla Sadar': ['Comilla Head Office (3500)'],
        Laksam: ['Laksam (3570)'],
      },
      Noakhali: {
        Maijdee: ['Maijdee Court (3800)'],
        Begumganj: ['Chowmuhani (3820)'],
      },
    },
    Sylhet: {
      Sylhet: {
        Kotwali: ['Sylhet GPO (3100)', 'Zindabazar (3101)'],
        Jalalabad: ['Jalalabad (3102)', 'SUST (3114)'],
        Airport: ['Sylhet Airport (3105)'],
        'South Surma': ['Kadamtali (3103)'],
      },
      Sreemangal: {
        'Sreemangal Sadar': ['Sreemangal (3210)'],
      },
      Moulvibazar: {
        'Moulvibazar Sadar': ['Moulvibazar (3200)'],
      },
    },
    Rajshahi: {
      Rajshahi: {
        Boalia: ['Rajshahi GPO (6000)', 'Saheb Bazar (6001)'],
        Rajpara: ['Rajpara (6002)', 'Medical (6003)'],
        Motihar: ['RU Campus (6205)'],
      },
      Bogra: {
        'Bogra Sadar': ['Bogra Head Office (5800)'],
        Sherpur: ['Sherpur (5840)'],
      },
      Pabna: {
        'Pabna Sadar': ['Pabna Head Office (6600)'],
        Ishwardi: ['Ishwardi (6620)'],
      },
    },
    Khulna: {
      Khulna: {
        'Khulna Sadar': ['Khulna GPO (9100)'],
        Sonadanga: ['Sonadanga (9101)'],
        Daulatpur: ['Daulatpur (9202)'],
      },
      Jessore: {
        'Jessore Sadar': ['Jessore Head Office (7400)'],
      },
      Kushtia: {
        'Kushtia Sadar': ['Kushtia Head Office (7000)'],
      },
    },
    Barishal: {
      Barishal: {
        'Barishal Sadar': ['Barishal GPO (8200)'],
        'Band Road': ['Band Road TSO (8201)'],
      },
      Patuakhali: {
        'Patuakhali Sadar': ['Patuakhali (8600)'],
      },
      Bhola: {
        'Bhola Sadar': ['Bhola (8300)'],
      },
    },
    Rangpur: {
      Rangpur: {
        'Rangpur Sadar': ['Rangpur Head Office (5400)'],
        Tajhat: ['Tajhat (5402)'],
      },
      Dinajpur: {
        'Dinajpur Sadar': ['Dinajpur Head Office (5200)'],
      },
    },
    Mymensingh: {
      Mymensingh: {
        'Mymensingh Sadar': ['Mymensingh Head Office (2200)'],
      },
      Jamalpur: {
        'Jamalpur Sadar': ['Jamalpur Head Office (2000)'],
      },
    },
  };

  return NextResponse.json({ success: true, hierarchy: BANGLADESH_DATA });
}
