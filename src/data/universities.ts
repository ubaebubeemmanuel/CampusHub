import { University } from '../types';

export const NIGERIAN_UNIVERSITIES: University[] = [
  // ================= FEDERAL UNIVERSITIES =================
  {
    id: 'unilag',
    name: 'University of Lagos',
    shortName: 'UNILAG',
    campus: 'Akoka, Yaba',
    state: 'Lagos',
    type: 'Federal',
    hostels: ['Moremi Hall', 'Jaja Hall', 'New Hall', 'Mariere Hall', 'Queen Amina Hall', 'Fagunwa Hall', 'Off-Campus Gate'],
    offCampusAreas: ['Abule Oja', 'Iwaya', 'Akoka', 'Onike', 'Bariga']
  },
  {
    id: 'ui',
    name: 'University of Ibadan',
    shortName: 'UI',
    campus: 'Agbowo, Ibadan',
    state: 'Oyo',
    type: 'Federal',
    hostels: ['Mellanby Hall', 'Tedder Hall', 'Kuti Hall', 'Sultan Bello Hall', 'Queen Elizabeth II Hall', 'Nnamdi Azikiwe Hall', 'Idia Hall', 'Off-Campus Agbowo'],
    offCampusAreas: ['Agbowo', 'Bodija', 'Orogun', 'Samonda', 'Ajibode']
  },
  {
    id: 'unn',
    name: 'University of Nigeria, Nsukka',
    shortName: 'UNN',
    campus: 'Nsukka Main Campus',
    state: 'Enugu',
    type: 'Federal',
    hostels: ['Franco Hall', 'Eni Njoku Hall', 'Okpara Hall', 'Mary Slessor Hall', 'Akpabio Hall', 'Bello Hall', 'Off-Campus Hilltop'],
    offCampusAreas: ['Hilltop', 'Odenigbo', 'Behind Flat', 'Odim Gate', 'Onuiyi']
  },
  {
    id: 'abu',
    name: 'Ahmadu Bello University',
    shortName: 'ABU',
    campus: 'Samaru, Zaria',
    state: 'Kaduna',
    type: 'Federal',
    hostels: ['Suleiman Hall', 'Ribadu Hall', 'Danfodio Hall', 'Alexander Hall', 'Amina Hall', 'Icsa/Ramat Hall', 'Off-Campus Samaru'],
    offCampusAreas: ['Samaru', 'PZ Quarters', 'Zango', 'Kongo', 'Sabon Gari']
  },
  {
    id: 'oau',
    name: 'Obafemi Awolowo University',
    shortName: 'OAU',
    campus: 'Ile-Ife Main Campus',
    state: 'Osun',
    type: 'Federal',
    hostels: ['Awolowo Hall', 'Fajuyi Hall', 'Angola Hall', 'Mozambique Hall', 'Moremi Hall', 'ETF Hall', 'Off-Campus Maintenance'],
    offCampusAreas: ['Mayfair', 'Asherifa', 'Ede Road', 'Parakin', 'Lagere']
  },
  {
    id: 'uniben',
    name: 'University of Benin',
    shortName: 'UNIBEN',
    campus: 'Ugbowo, Benin City',
    state: 'Edo',
    type: 'Federal',
    hostels: ['Hall 1', 'Hall 2', 'Hall 3 (NDDC)', 'Hall 4 (Akenzua)', 'Keystone Hostel', 'Off-Campus Ekosodin'],
    offCampusAreas: ['Ekosodin', 'BDPA', 'Osasogie', 'Ugbowo', 'Adolor']
  },
  {
    id: 'uniport',
    name: 'University of Port Harcourt',
    shortName: 'UNIPORT',
    campus: 'Choba Campus',
    state: 'Rivers',
    type: 'Federal',
    hostels: ['Dan Etete Hall', 'Nelson Mandela Hall', 'Nnamdi Azikiwe Hall', 'Ofrima Complex', 'Off-Campus Alakahia'],
    offCampusAreas: ['Alakahia', 'Choba', 'Aluu', 'Rumuosi', 'Ozuoba']
  },
  {
    id: 'unilorin',
    name: 'University of Ilorin',
    shortName: 'UNILORIN',
    campus: 'Tanke, Ilorin',
    state: 'Kwara',
    type: 'Federal',
    hostels: ['Lagos Hostel', 'Abuja Hostel', 'Trillium Hostel', 'Hizbullah Hostel', 'Off-Campus Tanke'],
    offCampusAreas: ['Tanke', 'Oke-Odo', 'Tipper Garage', 'Sanrab', 'Stella Maris']
  },
  {
    id: 'unical',
    name: 'University of Calabar',
    shortName: 'UNICAL',
    campus: 'Calabar Main Campus',
    state: 'Cross River',
    type: 'Federal',
    hostels: ['Malabo Republic (Hall 4-9)', 'Hall 2', 'Hall 3', 'Off-Campus Goldie'],
    offCampusAreas: ['Goldie', 'Atakpa', 'Etta Agbor', 'Satellite Town', 'Mary Slessor']
  },
  {
    id: 'unijos',
    name: 'University of Jos',
    shortName: 'UNIJOS',
    campus: 'Bauchi Road & Naraguta',
    state: 'Plateau',
    type: 'Federal',
    hostels: ['Naraguta Hostel', 'Village Hostel', 'Abuja Hostel', 'Zion Hostel', 'Off-Campus Bauchi Road'],
    offCampusAreas: ['Bauchi Road', 'Farin Gada', 'Lamingo', 'Tina Junction', 'Russau']
  },
  {
    id: 'unimaid',
    name: 'University of Maiduguri',
    shortName: 'UNIMAID',
    campus: 'Bama Road, Maiduguri',
    state: 'Borno',
    type: 'Federal',
    hostels: ['El-Kanemi Hall', 'Murtala Hall', 'Aisha Hall', 'Amina Hall', 'Off-Campus Mairi'],
    offCampusAreas: ['Mairi', 'Gombole', 'Bama Road', 'Dalori Quarters', 'London Ciki']
  },
  {
    id: 'buk',
    name: 'Bayero University Kano',
    shortName: 'BUK',
    campus: 'New Site, Gwarzo Road',
    state: 'Kano',
    type: 'Federal',
    hostels: ['Dantata Hostel', 'Ramat Hall', 'El-Kanemi Hall', 'Nana Aisha Hall', 'Off-Campus Janbulo'],
    offCampusAreas: ['Janbulo', 'Rijiyar Zaki', 'Kabuga', 'Dorayi', 'Danbare']
  },
  {
    id: 'udus',
    name: 'Usmanu Danfodiyo University',
    shortName: 'UDUS',
    campus: 'Dundaye, Sokoto',
    state: 'Sokoto',
    type: 'Federal',
    hostels: ['Buhari Hostel', 'Jubril Aminu Hostel', 'Bakassi Hostel', 'Zamfara Hostel', 'Off-Campus Dundaye'],
    offCampusAreas: ['Dundaye', 'Kwalkwalawa', 'Gidan Igwe', 'Arkilla', 'Runjin Sambo']
  },
  {
    id: 'futo',
    name: 'Federal University of Technology, Owerri',
    shortName: 'FUTO',
    campus: 'Ihiagwa, Owerri',
    state: 'Imo',
    type: 'Federal',
    hostels: ['Hostel A', 'Hostel B', 'Hostel C', 'Hostel D', 'NDDC Hostel', 'Off-Campus Eziobodo'],
    offCampusAreas: ['Eziobodo', 'Umuchima', 'Ihiagwa', 'Obinze', 'Nekede']
  },
  {
    id: 'futa',
    name: 'Federal University of Technology, Akure',
    shortName: 'FUTA',
    campus: 'Obanla Campus',
    state: 'Ondo',
    type: 'Federal',
    hostels: ['Jibowu Hall', 'Abiola Hall', 'Adeniyi Hall', 'Akintola Hall', 'Off-Campus South Gate'],
    offCampusAreas: ['South Gate', 'North Gate', 'Apatapiti', 'Stateline', 'Aba']
  },
  {
    id: 'futminna',
    name: 'Federal University of Technology, Minna',
    shortName: 'FUTMINNA',
    campus: 'Gidan Kwano & Bosso',
    state: 'Niger',
    type: 'Federal',
    hostels: ['Male Old Hostel', 'Female Hostel Block A', 'New Hostel GK', 'Off-Campus Gidan Kwano'],
    offCampusAreas: ['Gidan Kwano', 'Bosso', 'Garatu', 'Kpakungu', 'Tunga']
  },
  {
    id: 'atbu',
    name: 'Abubakar Tafawa Balewa University',
    shortName: 'ATBU',
    campus: 'Yelwa & Gubi',
    state: 'Bauchi',
    type: 'Federal',
    hostels: ['Yelwa Male Hostel', 'Gubi Complex', 'Female Hostel Yelwa', 'Off-Campus Yelwa'],
    offCampusAreas: ['Yelwa Tudu', 'Kagadama', 'Wuntin Dada', 'Gubi', 'Dass Road']
  },
  {
    id: 'funaab',
    name: 'Federal University of Agriculture, Abeokuta',
    shortName: 'FUNAAB',
    campus: 'Alabata Road, Abeokuta',
    state: 'Ogun',
    type: 'Federal',
    hostels: ['Umar Kabir Hall', 'Iyalode Tinubu Hall', 'Princess Hostel', 'Off-Campus Camp'],
    offCampusAreas: ['Camp', 'Harmony Estate', 'Isolu', 'Oluwo', 'Accord Estate']
  },
  {
    id: 'mouau',
    name: 'Michael Okpara University of Agriculture',
    shortName: 'MOUAU',
    campus: 'Umudike, Umuahia',
    state: 'Abia',
    type: 'Federal',
    hostels: ['New Female Hostel', 'Male Hostel A', 'Tetfund Hostel', 'Off-Campus Amaoba'],
    offCampusAreas: ['Amaoba', 'Umudike', 'Umuariaga', 'Ndoru', 'Ahiaeke']
  },
  {
    id: 'jostum',
    name: 'Joseph Sarwuan Tarka University (FUAM)',
    shortName: 'JOSTUM',
    campus: 'Makurdi Main Campus',
    state: 'Benue',
    type: 'Federal',
    hostels: ['Block A Hostel', 'Block B Hostel', 'Female Annex', 'Off-Campus North Bank'],
    offCampusAreas: ['North Bank', 'South Core', 'Wurukum', 'Agan', 'High Level']
  },
  {
    id: 'uniuyo',
    name: 'University of Uyo',
    shortName: 'UNIUYO',
    campus: 'Town & Nwaniba Permanent Site',
    state: 'Akwa Ibom',
    type: 'Federal',
    hostels: ['Hall 1 Town Campus', 'Nwaniba Hostel', 'Female Hall W2', 'Off-Campus Ikpa Road'],
    offCampusAreas: ['Ikpa Road', 'Udo Umana', 'Nwaniba', 'Use Offot', 'Oron Road']
  },
  {
    id: 'unizik',
    name: 'Nnamdi Azikiwe University',
    shortName: 'UNIZIK',
    campus: 'Awka Main Campus',
    state: 'Anambra',
    type: 'Federal',
    hostels: ['Basil Oli Hostel', 'Stella Okoli Hostel', 'Elmada Hostel', 'Off-Campus Ifite'],
    offCampusAreas: ['Ifite', 'Temp Site', 'Aroma', 'Amansea', 'Okpuno']
  },
  {
    id: 'uniabuja',
    name: 'University of Abuja',
    shortName: 'UNIABUJA',
    campus: 'Gwagwalada Main Campus',
    state: 'FCT Abuja',
    type: 'Federal',
    hostels: ['Male Hostel Mini', 'Female Hostel Main', 'New Tetfund Hall', 'Off-Campus Giri'],
    offCampusAreas: ['Gwagwalada', 'Giri', 'Passo', 'Dagiri', 'Kutunku']
  },
  {
    id: 'nda',
    name: 'Nigerian Defence Academy',
    shortName: 'NDA',
    campus: 'Afaka, Kaduna',
    state: 'Kaduna',
    type: 'Federal',
    hostels: ['Mogadishu Battalion', 'Burma Battalion', 'Dalet Battalion', 'Abyssinia Battalion'],
    offCampusAreas: ['Afaka', 'Mando', 'Rigachikun', 'Kawo']
  },
  {
    id: 'fupre',
    name: 'Federal University of Petroleum Resources',
    shortName: 'FUPRE',
    campus: 'Effurun, Uvwie',
    state: 'Delta',
    type: 'Federal',
    hostels: ['FUPRE Hostel 1', 'FUPRE Female Hostel', 'Off-Campus Ugbomro'],
    offCampusAreas: ['Ugbomro', 'Iteregbi', 'Osubi', 'Effurun', 'Jakpa Road']
  },
  {
    id: 'fuoye',
    name: 'Federal University Oye-Ekiti',
    shortName: 'FUOYE',
    campus: 'Oye & Ikole Campuses',
    state: 'Ekiti',
    type: 'Federal',
    hostels: ['FUOYE Heritage Hostel', 'Ikole Hostel', 'Off-Campus Oye'],
    offCampusAreas: ['Oye Town', 'Ikole', 'Aafin', 'Falegan', 'School Gate']
  },
  {
    id: 'fuotuoke',
    name: 'Federal University Otuoke',
    shortName: 'FUOTUOKE',
    campus: 'Otuoke, Ogbia',
    state: 'Bayelsa',
    type: 'Federal',
    hostels: ['Otuoke Hostel A', 'Female Lodge Complex', 'Off-Campus Otuoke'],
    offCampusAreas: ['Otuoke', 'Otuaba', 'Elebele', 'Emeyal', 'Yenagoa']
  },
  {
    id: 'fud',
    name: 'Federal University Dutse',
    shortName: 'FUD',
    campus: 'Ibrahim Aliyu Bye-Pass, Dutse',
    state: 'Jigawa',
    type: 'Federal',
    hostels: ['Male Block A', 'Female Block B', 'Off-Campus Takur'],
    offCampusAreas: ['Takur', 'Yalwawa', 'Gida Dubu', 'Kiyawa Road']
  },
  {
    id: 'fudma',
    name: 'Federal University Dutsin-Ma',
    shortName: 'FUDMA',
    campus: 'Take-Off & Permanent Site',
    state: 'Katsina',
    type: 'Federal',
    hostels: ['Main Hostel', 'Female Annex', 'Off-Campus Dutsin-Ma'],
    offCampusAreas: ['Dutsin-Ma Town', 'Darawa', 'Turare', 'Katsina Road']
  },
  {
    id: 'fukashere',
    name: 'Federal University of Kashere',
    shortName: 'FUKASHERE',
    campus: 'Kashere, Akko',
    state: 'Gombe',
    type: 'Federal',
    hostels: ['Kashere Male Hostel', 'Kashere Female Hostel', 'Off-Campus Kashere'],
    offCampusAreas: ['Kashere Town', 'Pindiga Road', 'Kumo']
  },
  {
    id: 'fulafia',
    name: 'Federal University of Lafia',
    shortName: 'FULAFIA',
    campus: 'Take-Off & Permanent Site',
    state: 'Nasarawa',
    type: 'Federal',
    hostels: ['Permanent Site Hostel', 'Female Hostel', 'Off-Campus Gandu'],
    offCampusAreas: ['Gandu', 'Mararraba Akunza', 'Akunza', 'Lafia Town']
  },
  {
    id: 'fulokoja',
    name: 'Federal University Lokoja',
    shortName: 'FULOKOJA',
    campus: 'Felele & Adankolo',
    state: 'Kogi',
    type: 'Federal',
    hostels: ['Felele Hostel', 'Adankolo Hostel', 'Off-Campus Felele'],
    offCampusAreas: ['Felele', 'Adankolo', 'Ganaja', 'Lokongoma', 'Crusher']
  },
  {
    id: 'funai',
    name: 'Alex Ekwueme Federal University Ndufu-Alike',
    shortName: 'AE-FUNAI',
    campus: 'Ndufu-Alike, Ikwo',
    state: 'Ebonyi',
    type: 'Federal',
    hostels: ['Ekwueme Hostel', 'New Female Hall', 'Off-Campus Ndufu-Alike'],
    offCampusAreas: ['Ndufu-Alike', 'Ikwo', 'Abakaliki', 'Nwakpu']
  },
  {
    id: 'fuwukari',
    name: 'Federal University Wukari',
    shortName: 'FUWUKARI',
    campus: 'Katsina-Ala Road, Wukari',
    state: 'Taraba',
    type: 'Federal',
    hostels: ['Wukari Male Hostel', 'Female Hostel', 'Off-Campus Takum Junction'],
    offCampusAreas: ['Takum Junction', 'Wukari Town', 'Puje', 'Avyi']
  },
  {
    id: 'fubk',
    name: 'Federal University Birnin Kebbi',
    shortName: 'FUBK',
    campus: 'Kalgo Road, Birnin Kebbi',
    state: 'Kebbi',
    type: 'Federal',
    hostels: ['Kalgo Hostel A', 'Female Hall', 'Off-Campus Kalgo'],
    offCampusAreas: ['Kalgo', 'Gesse', 'Badariya', 'Birnin Kebbi']
  },
  {
    id: 'fugus',
    name: 'Federal University Gusau',
    shortName: 'FUGUS',
    campus: 'Zaria Road, Gusau',
    state: 'Zamfara',
    type: 'Federal',
    hostels: ['Sabon Gida Hostel', 'Female Hall', 'Off-Campus Damba'],
    offCampusAreas: ['Damba', 'Sabon Gida', 'Tudun Wada', 'Gusau']
  },
  {
    id: 'fugashua',
    name: 'Federal University Gashua',
    shortName: 'FUGASHUA',
    campus: 'Nguru Road, Gashua',
    state: 'Yobe',
    type: 'Federal',
    hostels: ['Bade Hostel', 'Female Annex', 'Off-Campus Gashua'],
    offCampusAreas: ['Gashua Town', 'Sarkin Hausawa', 'Katuzu']
  },
  {
    id: 'mautech',
    name: 'Modibbo Adama University, Yola',
    shortName: 'MAU',
    campus: 'Girei, Yola',
    state: 'Adamawa',
    type: 'Federal',
    hostels: ['Old Male Hostel', 'New Female Hall', 'Off-Campus Sangere'],
    offCampusAreas: ['Sangere', 'Girei', 'Bajabure', 'Jimeta']
  },
  {
    id: 'noun',
    name: 'National Open University of Nigeria',
    shortName: 'NOUN',
    campus: 'Jabi Study Centre & Nationwide',
    state: 'FCT Abuja',
    type: 'Federal',
    hostels: ['Off-Campus Study Hub'],
    offCampusAreas: ['Jabi', 'Utako', 'Wuse', 'Victoria Island (Lagos)', 'Regional Centres']
  },
  {
    id: 'nmu',
    name: 'Nigeria Maritime University',
    shortName: 'NMU',
    campus: 'Okerenkoko, Warri South-West',
    state: 'Delta',
    type: 'Federal',
    hostels: ['Cadet Quarters A', 'Cadet Quarters B', 'Kuritie Campus'],
    offCampusAreas: ['Okerenkoko', 'Kuritie', 'Warri']
  },
  {
    id: 'fuhso',
    name: 'Federal University of Health Sciences, Otukpo',
    shortName: 'FUHSO',
    campus: 'Otada, Otukpo',
    state: 'Benue',
    type: 'Federal',
    hostels: ['Medical Hostel A', 'Female Medical Hall', 'Off-Campus Otada'],
    offCampusAreas: ['Otada', 'Otukpo Town', 'GRA Otukpo']
  },
  {
    id: 'fuhsa',
    name: 'Federal University of Health Sciences, Azare',
    shortName: 'FUHSA',
    campus: 'Azare, Katagum',
    state: 'Bauchi',
    type: 'Federal',
    hostels: ['Azare Hostel', 'Off-Campus Azare'],
    offCampusAreas: ['Azare', 'Katagum', 'Kano Road']
  },
  {
    id: 'fuhsi',
    name: 'Federal University of Health Sciences, Ila-Orangun',
    shortName: 'FUHSI',
    campus: 'Ila-Orangun',
    state: 'Osun',
    type: 'Federal',
    hostels: ['Campus Lodge', 'Off-Campus Ila'],
    offCampusAreas: ['Ila-Orangun', 'Oke-Ila', 'Ora Road']
  },
  {
    id: 'fuaz',
    name: 'Federal University of Agriculture, Zuru',
    shortName: 'FUAZ',
    campus: 'Zuru Main Campus',
    state: 'Kebbi',
    type: 'Federal',
    hostels: ['Zuru Hostel', 'Off-Campus Zuru'],
    offCampusAreas: ['Zuru Town', 'Rikoto', 'Dabai']
  },
  {
    id: 'fuab',
    name: 'Federal University of Agriculture, Bassambiri',
    shortName: 'FUAB',
    campus: 'Bassambiri, Nembe',
    state: 'Bayelsa',
    type: 'Federal',
    hostels: ['Campus Quarters', 'Off-Campus Nembe'],
    offCampusAreas: ['Bassambiri', 'Ogbolomabiri', 'Nembe']
  },
  {
    id: 'futia',
    name: 'Federal University of Technology, Ikot Abasi',
    shortName: 'FUTIA',
    campus: 'Ikot Abasi',
    state: 'Akwa Ibom',
    type: 'Federal',
    hostels: ['FUTIA Main Hostel', 'Off-Campus Ikot Abasi'],
    offCampusAreas: ['Ikot Abasi', 'Ete', 'Ukam']
  },
  {
    id: 'futb',
    name: 'Federal University of Technology, Babura',
    shortName: 'FUTB',
    campus: 'Babura',
    state: 'Jigawa',
    type: 'Federal',
    hostels: ['Babura Hostel', 'Off-Campus Babura'],
    offCampusAreas: ['Babura Town', 'Kano Border Road']
  },
  {
    id: 'fute',
    name: 'Federal University of Technology, Auchi',
    shortName: 'FUTA-AUCHI',
    campus: 'Auchi',
    state: 'Edo',
    type: 'Federal',
    hostels: ['Campus Hostel', 'Off-Campus Auchi'],
    offCampusAreas: ['Auchi', 'Jattu', 'Iyakpi']
  },
  {
    id: 'dufuhs',
    name: 'David Umahi Federal Univ. of Health Sciences',
    shortName: 'DUFUHS',
    campus: 'Uburu, Ohaozara',
    state: 'Ebonyi',
    type: 'Federal',
    hostels: ['Medical Suites A', 'Medical Suites B', 'Female Royal Hostel'],
    offCampusAreas: ['Uburu', 'Okposi', 'Amasiri']
  },
  {
    id: 'aeu-abuja',
    name: 'Air Force Institute of Technology',
    shortName: 'AFIT',
    campus: 'NAF Base, Kaduna',
    state: 'Kaduna',
    type: 'Federal',
    hostels: ['AFIT Wing A', 'AFIT Wing B', 'Off-Campus Mando'],
    offCampusAreas: ['Mando', 'Kawo', 'Badarawa', 'Ungwan Dosa']
  },
  {
    id: 'naub',
    name: 'Nigerian Army University Biu',
    shortName: 'NAUB',
    campus: 'Biu, Borno',
    state: 'Borno',
    type: 'Federal',
    hostels: ['NAUB Hostel 1', 'NAUB Hostel 2', 'Off-Campus Biu'],
    offCampusAreas: ['Biu Town', 'Gombe Road', 'Tabra']
  },
  {
    id: 'polac',
    name: 'Nigeria Police Academy',
    shortName: 'POLAC',
    campus: 'Wudil, Kano',
    state: 'Kano',
    type: 'Federal',
    hostels: ['Cadet Barrack 1', 'Cadet Barrack 2'],
    offCampusAreas: ['Wudil', 'Garko', 'Kano']
  },
  {
    id: 'admiralty',
    name: 'Admiralty University of Nigeria',
    shortName: 'ADUN',
    campus: 'Ibusa, Asaba',
    state: 'Delta',
    type: 'Federal',
    hostels: ['Admiral Hall', 'Naval Suites', 'Off-Campus Ibusa'],
    offCampusAreas: ['Ibusa', 'Asaba', 'Ogwashi-Uku']
  },
  {
    id: 'futrans',
    name: 'Federal University of Transportation, Daura',
    shortName: 'FUTD',
    campus: 'Daura',
    state: 'Katsina',
    type: 'Federal',
    hostels: ['Daura Hostel A', 'Off-Campus Daura'],
    offCampusAreas: ['Daura Town', 'Kwangwalam', 'Zango']
  },
  {
    id: 'fued-zaria',
    name: 'Federal University of Education, Zaria',
    shortName: 'FUEZ',
    campus: 'Gyellesu, Zaria',
    state: 'Kaduna',
    type: 'Federal',
    hostels: ['Amina Hall', 'Main Hostel', 'Off-Campus Gyellesu'],
    offCampusAreas: ['Gyellesu', 'Congo', 'Tudun Wada']
  },
  {
    id: 'fued-kano',
    name: 'Federal University of Education, Kano',
    shortName: 'FUEK',
    campus: 'Kofar Kabuga, Kano',
    state: 'Kano',
    type: 'Federal',
    hostels: ['Kabuga Hostel', 'Off-Campus Kano'],
    offCampusAreas: ['Kabuga', 'Gwale', 'Kofar Famfo']
  },
  {
    id: 'alvan',
    name: 'Alvan Ikoku Federal University of Education',
    shortName: 'AIFUE',
    campus: 'Orlu Road, Owerri',
    state: 'Imo',
    type: 'Federal',
    hostels: ['Hostel A', 'Hostel B', 'Off-Campus Shell Camp'],
    offCampusAreas: ['Shell Camp', 'Works Layout', 'Amakohia', 'Orlu Road']
  },
  {
    id: 'ace-ondo',
    name: 'Adeyemi Federal University of Education',
    shortName: 'AFUED',
    campus: 'Ondo City',
    state: 'Ondo',
    type: 'Federal',
    hostels: ['Oba Adesanoye Hall', 'Female Hall', 'Off-Campus Laje'],
    offCampusAreas: ['Laje', 'Yaba Ondo', 'Ondo-Ore Road', 'Sabo']
  },
  {
    id: 'fued-pankshin',
    name: 'Federal University of Education, Pankshin',
    shortName: 'FUEP',
    campus: 'Pankshin',
    state: 'Plateau',
    type: 'Federal',
    hostels: ['Pankshin Hostel', 'Off-Campus Pankshin'],
    offCampusAreas: ['Pankshin Town', 'Nyer', 'Vel']
  },
  {
    id: 'fued-kontagora',
    name: 'Federal University of Education, Kontagora',
    shortName: 'FUEK-NG',
    campus: 'Kontagora',
    state: 'Niger',
    type: 'Federal',
    hostels: ['Main Hostel', 'Off-Campus Kontagora'],
    offCampusAreas: ['Kontagora Town', 'Tudun Wada', 'GRA']
  },
  {
    id: 'fue-omoku',
    name: 'Federal University of Education (Tech), Omoku',
    shortName: 'FUETO',
    campus: 'Omoku',
    state: 'Rivers',
    type: 'Federal',
    hostels: ['Omoku Hostel', 'Off-Campus Omoku'],
    offCampusAreas: ['Omoku', 'Obrikom', 'Erema']
  },
  {
    id: 'fued-bichi',
    name: 'Federal University of Education (Tech), Bichi',
    shortName: 'FUETB',
    campus: 'Bichi',
    state: 'Kano',
    type: 'Federal',
    hostels: ['Bichi Hostel', 'Off-Campus Bichi'],
    offCampusAreas: ['Bichi Town', 'Kano Road']
  },
  {
    id: 'fued-gusau',
    name: 'Federal University of Education (Tech), Gusau',
    shortName: 'FUETG',
    campus: 'Gusau',
    state: 'Zamfara',
    type: 'Federal',
    hostels: ['Gusau Hostel', 'Off-Campus Gusau'],
    offCampusAreas: ['Gusau', 'Tudun Wada', 'Sambo']
  },
  {
    id: 'fued-gombe',
    name: 'Federal University of Education (Tech), Gombe',
    shortName: 'FUET-GOMBE',
    campus: 'Gombe',
    state: 'Gombe',
    type: 'Federal',
    hostels: ['Gombe Hostel', 'Off-Campus Tudun Wada'],
    offCampusAreas: ['Tudun Wada', 'Federal Lowcost', 'Pantami']
  },

  // ================= STATE UNIVERSITIES =================
  {
    id: 'lasu',
    name: 'Lagos State University',
    shortName: 'LASU',
    campus: 'Ojo Main Campus',
    state: 'Lagos',
    type: 'State',
    hostels: ['LASU Female Hostel', '3-in-1 Hall', 'Off-Campus Iba'],
    offCampusAreas: ['Iba', 'Igando', 'Iyana Iba', 'Okokomaiko', 'PPL']
  },
  {
    id: 'lasustech',
    name: 'Lagos State University of Science & Tech',
    shortName: 'LASUSTECH',
    campus: 'Ikorodu Main Campus',
    state: 'Lagos',
    type: 'State',
    hostels: ['Ikorodu Campus Hostel', 'Off-Campus Ita Oluwo'],
    offCampusAreas: ['Ita Oluwo', 'Odogunyan', 'Sagamu Road', 'Ikorodu Garage']
  },
  {
    id: 'lasued',
    name: 'Lagos State University of Education',
    shortName: 'LASUED',
    campus: 'Oto/Ijanikin & Noforija Epe',
    state: 'Lagos',
    type: 'State',
    hostels: ['Ijanikin Hostel', 'Epe Campus Hostel', 'Off-Campus Ijanikin'],
    offCampusAreas: ['Ijanikin', 'Oto', 'Agbara', 'Epe']
  },
  {
    id: 'oou',
    name: 'Olabisi Onabanjo University',
    shortName: 'OOU',
    campus: 'Ago-Iwoye Main Campus',
    state: 'Ogun',
    type: 'State',
    hostels: ['OOU Main Hostel', 'Off-Campus Ago-Iwoye'],
    offCampusAreas: ['Ago-Iwoye', 'Oru', 'Awa', 'Ijebu Igbo', 'Mini Campus']
  },
  {
    id: 'tasued',
    name: 'Tai Solarin University of Education',
    shortName: 'TASUED',
    campus: 'Ijagun, Ijebu-Ode',
    state: 'Ogun',
    type: 'State',
    hostels: ['TASUED Hall', 'Off-Campus Ijagun'],
    offCampusAreas: ['Ijagun', 'Imaweje', 'Abapawa', 'Ijebu-Ode']
  },
  {
    id: 'lautech',
    name: 'Ladoke Akintola University of Technology',
    shortName: 'LAUTECH',
    campus: 'Ogbomoso Main Campus',
    state: 'Oyo',
    type: 'State',
    hostels: ['Off-Campus Under G', 'Adenike Hostel Zone'],
    offCampusAreas: ['Under G', 'Adenike', 'Yoaco', 'Stadium', 'Aroje']
  },
  {
    id: 'techu',
    name: 'Abiola Ajimobi Technical University (Tech-U)',
    shortName: 'TECH-U',
    campus: 'Lagos-Ibadan Expressway',
    state: 'Oyo',
    type: 'State',
    hostels: ['University Hall A', 'University Hall B'],
    offCampusAreas: ['Odinjo', 'Iwo Road', 'Challenge', 'Idi-Ayunre']
  },
  {
    id: 'uniosun',
    name: 'Osun State University',
    shortName: 'UNIOSUN',
    campus: 'Osogbo Main & 6 Campuses',
    state: 'Osun',
    type: 'State',
    hostels: ['Oke-Baale Hostel', 'Okuku Campus Hostel', 'Off-Campus Oke-Baale'],
    offCampusAreas: ['Oke-Baale', 'Ota Efun', 'Okuku', 'Ikire', 'Ejigbo']
  },
  {
    id: 'unilesa',
    name: 'University of Ilesa',
    shortName: 'UNILESA',
    campus: 'Ilesa Main Campus',
    state: 'Osun',
    type: 'State',
    hostels: ['Ilesa Hostel', 'Off-Campus Ilesa'],
    offCampusAreas: ['Ilesa', 'Irojo', 'Omi-Aladiye', 'Imo']
  },
  {
    id: 'eksu',
    name: 'Ekiti State University',
    shortName: 'EKSU',
    campus: 'Iworoko Road, Ado-Ekiti',
    state: 'Ekiti',
    type: 'State',
    hostels: ['Satellites Hostel', 'Off-Campus Iworoko'],
    offCampusAreas: ['Iworoko', 'School Gate', 'Osekita', 'Opopogbooro', 'Ado-Ekiti']
  },
  {
    id: 'bouesti',
    name: 'Bamidele Olumilua University of Education, Sci & Tech',
    shortName: 'BOUESTI',
    campus: 'Ikere-Ekiti',
    state: 'Ekiti',
    type: 'State',
    hostels: ['Ikere Hostel A', 'Off-Campus Ikere'],
    offCampusAreas: ['Ikere-Ekiti', 'Uro', 'Odo-Oja']
  },
  {
    id: 'aaua',
    name: 'Adekunle Ajasin University',
    shortName: 'AAUA',
    campus: 'Akungba-Akoko',
    state: 'Ondo',
    type: 'State',
    hostels: ['Nelson Mandela Hostel', 'Off-Campus Akungba'],
    offCampusAreas: ['Akungba', 'Ikare', 'Supare', 'Medola', 'Permanent Site']
  },
  {
    id: 'oaustech',
    name: 'Olusegun Agagu Univ. of Science & Tech',
    shortName: 'OAUSTECH',
    campus: 'Okitipupa',
    state: 'Ondo',
    type: 'State',
    hostels: ['Okitipupa Hall', 'Off-Campus Aye Road'],
    offCampusAreas: ['Okitipupa', 'Aye Road', 'Idepe', 'Igbokoda']
  },
  {
    id: 'unimed',
    name: 'University of Medical Sciences, Ondo',
    shortName: 'UNIMED',
    campus: 'Laje Road, Ondo City',
    state: 'Ondo',
    type: 'State',
    hostels: ['Medical Village Hostel', 'Off-Campus Laje'],
    offCampusAreas: ['Laje', 'Yaba Ondo', 'Ondo Town']
  },
  {
    id: 'kwasu',
    name: 'Kwara State University',
    shortName: 'KWASU',
    campus: 'Malete, Moro',
    state: 'Kwara',
    type: 'State',
    hostels: ['University Hall', 'Private Hostel Hubs', 'Off-Campus Malete'],
    offCampusAreas: ['Malete', 'West End', 'Safari', 'Elemere', 'Shao']
  },
  {
    id: 'delsu',
    name: 'Delta State University',
    shortName: 'DELSU',
    campus: 'Abraka Main Campus',
    state: 'Delta',
    type: 'State',
    hostels: ['Site 2 Hostel', 'Site 3 NDDC Hall', 'Abraka Hall', 'Off-Campus Abraka'],
    offCampusAreas: ['Campus 1', 'Campus 2', 'Campus 3', 'Urhuoka', 'Ekrejeta']
  },
  {
    id: 'unidel',
    name: 'University of Delta, Agbor',
    shortName: 'UNIDEL',
    campus: 'Agbor Main Campus',
    state: 'Delta',
    type: 'State',
    hostels: ['Agbor Hall A', 'Female Hall', 'Off-Campus Boji-Boji'],
    offCampusAreas: ['Boji-Boji Owa', 'Agbor', 'Alisimie', 'Obi']
  },
  {
    id: 'dsust',
    name: 'Delta State University of Science & Tech',
    shortName: 'DSUST',
    campus: 'Ozoro',
    state: 'Delta',
    type: 'State',
    hostels: ['Ozoro Hostel', 'Off-Campus Ozoro'],
    offCampusAreas: ['Ozoro', 'Ndokwa Road', 'Ughelli Road']
  },
  {
    id: 'ddsp',
    name: 'Dennis Osadebay University',
    shortName: 'DOU',
    campus: 'Anwai, Asaba',
    state: 'Delta',
    type: 'State',
    hostels: ['Anwai Hall', 'Off-Campus Asaba'],
    offCampusAreas: ['Anwai', 'Okpanam', 'Summit Road', 'Cable Point']
  },
  {
    id: 'aau',
    name: 'Ambrose Alli University',
    shortName: 'AAU',
    campus: 'Ekpoma',
    state: 'Edo',
    type: 'State',
    hostels: ['Igbinedion Hostel', 'Rev. Martins Hall', 'Off-Campus Emaudo'],
    offCampusAreas: ['Emaudo', 'Ujoelen', 'Ihumudumu', 'Poultry Road', 'Iruekpen']
  },
  {
    id: 'edouniversity',
    name: 'Edo State University Uzairue',
    shortName: 'EDSU',
    campus: 'Iyamho, Uzairue',
    state: 'Edo',
    type: 'State',
    hostels: ['Iyamho Male Hall', 'Iyamho Female Hall'],
    offCampusAreas: ['Iyamho', 'Jattu', 'Auchi']
  },
  {
    id: 'rsu',
    name: 'Rivers State University',
    shortName: 'RSU',
    campus: 'Nkpolu-Oroworukwo, Port Harcourt',
    state: 'Rivers',
    type: 'State',
    hostels: ['Hostel A', 'Hostel B', 'Hostel C', 'NDDC Female Hostel', 'Off-Campus Mile 3'],
    offCampusAreas: ['Mile 3', 'Diobu', 'Eagle Island', 'Agip', 'Ada George']
  },
  {
    id: 'iaue',
    name: 'Ignatius Ajuru University of Education',
    shortName: 'IAUE',
    campus: 'Rumuolumeni, Port Harcourt',
    state: 'Rivers',
    type: 'State',
    hostels: ['Stella Obasanjo Hall', 'Ndele Hostel', 'Off-Campus Rumuolumeni'],
    offCampusAreas: ['Rumuolumeni', 'Iwofe', 'Aker', 'Mgbuosimini']
  },
  {
    id: 'ndu',
    name: 'Niger Delta University',
    shortName: 'NDU',
    campus: 'Wilberforce Island, Amassoma',
    state: 'Bayelsa',
    type: 'State',
    hostels: ['New Site Hostel', 'Main Campus Hall', 'Off-Campus Amassoma'],
    offCampusAreas: ['Amassoma', 'Ogobiri', 'Tombia', 'Yenagoa']
  },
  {
    id: 'bmu',
    name: 'Bayelsa Medical University',
    shortName: 'BMU',
    campus: 'Onopa, Yenagoa',
    state: 'Bayelsa',
    type: 'State',
    hostels: ['BMU Residence', 'Off-Campus Amarata'],
    offCampusAreas: ['Amarata', 'Onopa', 'Opolo', 'Ekeki']
  },
  {
    id: 'aksu',
    name: 'Akwa Ibom State University',
    shortName: 'AKSU',
    campus: 'Ikot Akpaden & Obio Akpa',
    state: 'Akwa Ibom',
    type: 'State',
    hostels: ['Ikot Akpaden Hostel', 'Obio Akpa Hostel', 'Off-Campus Mkpat Enin'],
    offCampusAreas: ['Ikot Akpaden', 'Eket', 'Obio Akpa', 'Abak']
  },
  {
    id: 'unicross',
    name: 'University of Cross River State',
    shortName: 'UNICROSS',
    campus: 'Ekpo Abasi, Calabar',
    state: 'Cross River',
    type: 'State',
    hostels: ['Hall 1 Calabar', 'Ogoja Campus Hall', 'Off-Campus Ekpo Abasi'],
    offCampusAreas: ['Ekpo Abasi', 'Crutech Gate', 'Edim Otop', 'Anantigha']
  },
  {
    id: 'esut',
    name: 'Enugu State University of Science & Tech',
    shortName: 'ESUT',
    campus: 'Agbani Main Campus',
    state: 'Enugu',
    type: 'State',
    hostels: ['Agbani Female Hostel', 'Male Hostel', 'Off-Campus Agbani'],
    offCampusAreas: ['Agbani', 'Umueze', 'Gariki', 'Independence Layout']
  },
  {
    id: 'sumas',
    name: 'State Univ. of Medical & Applied Sciences',
    shortName: 'SUMAS',
    campus: 'Igbo-Eno, Enugu',
    state: 'Enugu',
    type: 'State',
    hostels: ['Igbo-Eno Hall', 'Off-Campus Nsukka'],
    offCampusAreas: ['Igbo-Eno', 'Orba', 'Nsukka']
  },
  {
    id: 'ebsu',
    name: 'Ebonyi State University',
    shortName: 'EBSU',
    campus: 'CAS, Presco & Perm Site Abakaliki',
    state: 'Ebonyi',
    type: 'State',
    hostels: ['Presco Hostel', 'CAS Hostel', 'Perm Site Hall', 'Off-Campus Ishieke'],
    offCampusAreas: ['Ishieke', 'Presco', 'CAS', 'Kpirikpiri', 'Democracy Estate']
  },
  {
    id: 'coou',
    name: 'Chukwuemeka Odumegwu Ojukwu University',
    shortName: 'COOU',
    campus: 'Igbariam & Uli Campuses',
    state: 'Anambra',
    type: 'State',
    hostels: ['Igbariam Hostel', 'Uli Hostel', 'Off-Campus Uli'],
    offCampusAreas: ['Igbariam', 'Uli', 'Ihiala', 'Awka']
  },
  {
    id: 'absu',
    name: 'Abia State University',
    shortName: 'ABSU',
    campus: 'Uturu Main Campus',
    state: 'Abia',
    type: 'State',
    hostels: ['Hostel A', 'Hostel B', 'Hostel C', 'Hostel D', 'Off-Campus Miracle'],
    offCampusAreas: ['Uturu', 'Miracle', 'Okigwe', 'Up-school']
  },
  {
    id: 'imsu',
    name: 'Imo State University',
    shortName: 'IMSU',
    campus: 'Owerri Main Campus',
    state: 'Imo',
    type: 'State',
    hostels: ['Off-Campus Front Gate', 'Back Gate Lodges'],
    offCampusAreas: ['Front Gate', 'Back Gate', 'Works Layout', 'Ugwu Orji', 'Bishop Court']
  },
  {
    id: 'uaes',
    name: 'University of Agriculture & Env. Sciences',
    shortName: 'UAES',
    campus: 'Umuagwo, Ohaji',
    state: 'Imo',
    type: 'State',
    hostels: ['Umuagwo Hostel', 'Off-Campus Umuagwo'],
    offCampusAreas: ['Umuagwo', 'Obinze', 'Avu']
  },
  {
    id: 'koomu',
    name: 'Kingsley Ozumba Mbadiwe University',
    shortName: 'KOMU',
    campus: 'Ideato South, Ogboko',
    state: 'Imo',
    type: 'State',
    hostels: ['Ogboko Hall A', 'Ogboko Hall B', 'Off-Campus Ogboko'],
    offCampusAreas: ['Ogboko', 'Ideato', 'Orlu']
  },
  {
    id: 'paau',
    name: 'Prince Abubakar Audu University (KSU)',
    shortName: 'PAAU',
    campus: 'Anyigba Main Campus',
    state: 'Kogi',
    type: 'State',
    hostels: ['Old Male Hostel', 'New Female Hall', 'Off-Campus Stadium Road'],
    offCampusAreas: ['Anyigba', 'Stadium Road', 'Oganaji', 'Abuja Area']
  },
  {
    id: 'custech',
    name: 'Confluence University of Science & Tech',
    shortName: 'CUSTECH',
    campus: 'Osara, Adavi',
    state: 'Kogi',
    type: 'State',
    hostels: ['Osara Hostel A', 'Off-Campus Osara'],
    offCampusAreas: ['Osara', 'Okene', 'Lokoja']
  },
  {
    id: 'bsum',
    name: 'Benue State University',
    shortName: 'BSU',
    campus: 'Gboko Road, Makurdi',
    state: 'Benue',
    type: 'State',
    hostels: ['Western Campus Hall', 'Eastern Campus Hall', 'Off-Campus Gyado Villa'],
    offCampusAreas: ['Gyado Villa', 'Wurukum', 'Kanshio', 'High Level']
  },
  {
    id: 'nsuk',
    name: 'Nasarawa State University',
    shortName: 'NSUK',
    campus: 'Keffi Main Campus',
    state: 'Nasarawa',
    type: 'State',
    hostels: ['Male Hostel', 'Female Hostel', 'Off-Campus Angwan Lambu'],
    offCampusAreas: ['Angwan Lambu', 'High Court', 'GRA Keffi', 'Tudun Wada']
  },
  {
    id: 'plasu',
    name: 'Plateau State University',
    shortName: 'PLASU',
    campus: 'Bokkos',
    state: 'Plateau',
    type: 'State',
    hostels: ['Bokkos Hall A', 'Female Hall', 'Off-Campus Bokkos'],
    offCampusAreas: ['Bokkos Town', 'Butura', 'Mangor']
  },
  {
    id: 'tsuniversity',
    name: 'Taraba State University',
    shortName: 'TSU',
    campus: 'Jalingo',
    state: 'Taraba',
    type: 'State',
    hostels: ['Main Hostel', 'Female Hostel', 'Off-Campus ATC'],
    offCampusAreas: ['ATC', 'Nukkai', 'Sabon Gari', 'Jalingo']
  },
  {
    id: 'adsu',
    name: 'Adamawa State University',
    shortName: 'ADSU',
    campus: 'Mubi',
    state: 'Adamawa',
    type: 'State',
    hostels: ['Mubi Male Hostel', 'Female Hostel', 'Off-Campus Wuro Gude'],
    offCampusAreas: ['Wuro Gude', 'Lokuwa', 'Sabon Layi', 'Mubi']
  },
  {
    id: 'gsu',
    name: 'Gombe State University',
    shortName: 'GSU',
    campus: 'Tudun Wada, Gombe',
    state: 'Gombe',
    type: 'State',
    hostels: ['GSU Male Hostel', 'GSU Female Hostel', 'Off-Campus Shamaki'],
    offCampusAreas: ['Tudun Wada', 'Shamaki', 'Jekadafari', 'Madaki']
  },
  {
    id: 'basug',
    name: 'Sa\'adu Zungur University (BASUG)',
    shortName: 'SAZUNI',
    campus: 'Gadau, Bauchi',
    state: 'Bauchi',
    type: 'State',
    hostels: ['Gadau Male Hostel', 'Gadau Female Hostel', 'Off-Campus Gadau'],
    offCampusAreas: ['Gadau', 'Misau', 'Jama\'are']
  },
  {
    id: 'ysu',
    name: 'Yobe State University',
    shortName: 'YSU',
    campus: 'Gujba Road, Damaturu',
    state: 'Yobe',
    type: 'State',
    hostels: ['Damaturu Hostel A', 'Female Hostel', 'Off-Campus Red Bricks'],
    offCampusAreas: ['Red Bricks', 'Gwange', 'Bindigari', 'Damaturu']
  },
  {
    id: 'bosu',
    name: 'Borno State University',
    shortName: 'BOSU',
    campus: 'Njimtilo, Kano Road, Maiduguri',
    state: 'Borno',
    type: 'State',
    hostels: ['Njimtilo Hostel', 'Off-Campus Maiduguri'],
    offCampusAreas: ['Njimtilo', 'Gidan Madara', 'Pompomari', 'Biu Road']
  },
  {
    id: 'adustech',
    name: 'Aliko Dangote Univ. of Science & Tech (KUST)',
    shortName: 'ADUSTECH',
    campus: 'Wudil, Kano',
    state: 'Kano',
    type: 'State',
    hostels: ['Dangote Hostel', 'Male Block 2', 'Female Hostel', 'Off-Campus Wudil'],
    offCampusAreas: ['Wudil Town', 'Sabon Gari Wudil', 'Kano Road']
  },
  {
    id: 'ymksu',
    name: 'Yusuf Maitama Sule University',
    shortName: 'YUMSUK',
    campus: 'Main & City Campuses, Kano',
    state: 'Kano',
    type: 'State',
    hostels: ['City Campus Hostel', 'Off-Campus Kwanar Dawaki'],
    offCampusAreas: ['Kwanar Dawaki', 'Kofar Nassarawa', 'Gidan Zoo', 'Gyadi-Gyadi']
  },
  {
    id: 'slu',
    name: 'Sule Lamido University',
    shortName: 'SLU',
    campus: 'Kafin Hausa',
    state: 'Jigawa',
    type: 'State',
    hostels: ['Kafin Hausa Hostel', 'Off-Campus Kafin Hausa'],
    offCampusAreas: ['Kafin Hausa', 'Hadejia Road', 'Bulangu']
  },
  {
    id: 'umyu',
    name: 'Umaru Musa Yar\'adua University',
    shortName: 'UMYU',
    campus: 'Dutsin-Ma Road, Katsina',
    state: 'Katsina',
    type: 'State',
    hostels: ['UMYU Male Hostel', 'UMYU Female Hostel', 'Off-Campus Batagarawa'],
    offCampusAreas: ['Batagarawa', 'Dutsinma Road', 'Kofar Kaura', 'GRA Katsina']
  },
  {
    id: 'kasu',
    name: 'Kaduna State University',
    shortName: 'KASU',
    campus: 'Tafawa Balewa Way, Kaduna',
    state: 'Kaduna',
    type: 'State',
    hostels: ['Kafanchan Campus Hall', 'Off-Campus Ungwan Rimi'],
    offCampusAreas: ['Ungwan Rimi', 'Kabala', 'Barnawa', 'Malali', 'Kafanchan']
  },
  {
    id: 'ksusta',
    name: 'Kebbi State University of Science & Tech',
    shortName: 'KSUSTA',
    campus: 'Aliero',
    state: 'Kebbi',
    type: 'State',
    hostels: ['Aliero Male Hostel', 'Female Hostel', 'Off-Campus Aliero'],
    offCampusAreas: ['Aliero Town', 'Jega Road', 'Birnin Kebbi']
  },
  {
    id: 'ssu',
    name: 'Sokoto State University',
    shortName: 'SSU',
    campus: 'Birnin Kebbi Road, Sokoto',
    state: 'Sokoto',
    type: 'State',
    hostels: ['SSU Male Hostel', 'SSU Female Hostel', 'Off-Campus Tamaje'],
    offCampusAreas: ['Tamaje', 'Bado', 'Arkilla', 'Sokoto']
  },
  {
    id: 'zsu',
    name: 'Zamfara State University',
    shortName: 'ZAMSU',
    campus: 'Talata Mafara',
    state: 'Zamfara',
    type: 'State',
    hostels: ['Mafara Hostel', 'Off-Campus Talata Mafara'],
    offCampusAreas: ['Talata Mafara', 'Sokoto Road']
  },
  {
    id: 'ibbul',
    name: 'Ibrahim Badamasi Babangida University',
    shortName: 'IBBUL',
    campus: 'Lapai',
    state: 'Niger',
    type: 'State',
    hostels: ['Niger State Hall', 'Female Hall', 'Off-Campus Lapai'],
    offCampusAreas: ['Lapai Town', 'Low Cost', 'Kudu', 'Agaie Road']
  },
  {
    id: 'abdul-rasheed',
    name: 'Shehu Shagari University of Education',
    shortName: 'SSUES',
    campus: 'Sokoto',
    state: 'Sokoto',
    type: 'State',
    hostels: ['Main Hostel', 'Off-Campus Farfaru'],
    offCampusAreas: ['Farfaru', 'Runjin Sambo', 'Sokoto']
  },
  {
    id: 'kust-kebbi',
    name: 'Abdulkadir Kure University',
    shortName: 'AKUM',
    campus: 'Minna',
    state: 'Niger',
    type: 'State',
    hostels: ['Minna Hostel', 'Off-Campus Chanchaga'],
    offCampusAreas: ['Chanchaga', 'Tunga', 'Bosso']
  },
  {
    id: 'gombe-tech',
    name: 'Gombe State Univ. of Science & Tech',
    shortName: 'GOMSU-TECH',
    campus: 'Kumo',
    state: 'Gombe',
    type: 'State',
    hostels: ['Kumo Hostel', 'Off-Campus Kumo'],
    offCampusAreas: ['Kumo Town', 'Yola Road']
  },
  {
    id: 'mopa',
    name: 'Kogi State University, Kabba',
    shortName: 'KSU-KABBA',
    campus: 'Kabba',
    state: 'Kogi',
    type: 'State',
    hostels: ['Kabba Hostel', 'Off-Campus Kabba'],
    offCampusAreas: ['Kabba', 'Oke-Bukun', 'Okene Road']
  },
  {
    id: 'mapoly-uni',
    name: 'Moshood Abiola Univ. of Science & Tech',
    shortName: 'MAUSTECH',
    campus: 'Abeokuta',
    state: 'Ogun',
    type: 'State',
    hostels: ['Ojere Hostel', 'Off-Campus Panseke'],
    offCampusAreas: ['Ojere', 'Oluwo', 'Panseke', 'Kuto']
  },
  {
    id: 'imo-tech',
    name: 'University of Innovation, Sci & Tech',
    shortName: 'UIST-IMO',
    campus: 'Omuma, Oru East',
    state: 'Imo',
    type: 'State',
    hostels: ['Omuma Hostel', 'Off-Campus Oru'],
    offCampusAreas: ['Omuma', 'Mgbidi', 'Orlu']
  },
  {
    id: 'uat',
    name: 'University of Africa, Toru-Orua',
    shortName: 'UAT',
    campus: 'Toru-Orua, Sagbama',
    state: 'Bayelsa',
    type: 'State',
    hostels: ['Toru-Orua Hall A', 'Female Residence', 'Off-Campus Sagbama'],
    offCampusAreas: ['Toru-Orua', 'Sagbama', 'Angiama']
  },
  {
    id: 'eaued',
    name: 'Emmanuel Alayande University of Education',
    shortName: 'EAUED',
    campus: 'Oyo Main Campus',
    state: 'Oyo',
    type: 'State',
    hostels: ['Isokun Hostel', 'Erelu Campus Hall', 'Off-Campus Oyo'],
    offCampusAreas: ['Erelu', 'Oke-Ebo', 'Isokun', 'Oyo Town']
  },
  {
    id: 'kwara-edu',
    name: 'Kwara State University of Education',
    shortName: 'KWASUED',
    campus: 'Ilorin',
    state: 'Kwara',
    type: 'State',
    hostels: ['Ilorin Hall', 'Off-Campus Adewole'],
    offCampusAreas: ['Adewole', 'Taiwo Road', 'Tanke']
  },
  {
    id: 'fuadsi',
    name: 'Federal University of Agriculture & Dev. Studies',
    shortName: 'FUADSI',
    campus: 'Iragbiji',
    state: 'Osun',
    type: 'Federal',
    hostels: ['Iragbiji Campus Hostel', 'Off-Campus Iragbiji'],
    offCampusAreas: ['Iragbiji', 'Ikirun', 'Osogbo Road']
  },
  {
    id: 'futes',
    name: 'Federal University of Tech & Env. Sciences',
    shortName: 'FUTES',
    campus: 'Iyin-Ekiti',
    state: 'Ekiti',
    type: 'Federal',
    hostels: ['Iyin Campus Hostel', 'Off-Campus Iyin'],
    offCampusAreas: ['Iyin-Ekiti', 'Ado-Ekiti', 'Igede']
  },
  {
    id: 'fuask',
    name: 'Federal University of Applied Sciences, Kachia',
    shortName: 'FUASK',
    campus: 'Kachia',
    state: 'Kaduna',
    type: 'Federal',
    hostels: ['Kachia Hall', 'Off-Campus Kachia'],
    offCampusAreas: ['Kachia Town', 'Kaduna Road']
  },
  {
    id: 'fuet-rivers',
    name: 'Federal University of Environment & Technology',
    shortName: 'FUET',
    campus: 'Koroma/Saakpenwa, Tai',
    state: 'Rivers',
    type: 'Federal',
    hostels: ['Ogoni Campus Hostel', 'Off-Campus Saakpenwa'],
    offCampusAreas: ['Saakpenwa', 'Koroma', 'Bori']
  },
  {
    id: 'fummsa',
    name: 'Federal University of Medicine & Medical Sciences',
    shortName: 'FUMMSA',
    campus: 'Abeokuta',
    state: 'Ogun',
    type: 'Federal',
    hostels: ['Medical Hall A', 'Off-Campus Idi-Aba'],
    offCampusAreas: ['Idi-Aba', 'Kemta', 'Oke-Mosan', 'Abeokuta']
  }
];
