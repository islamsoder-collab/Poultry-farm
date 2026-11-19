// খামারের তালিকা। নতুন খামার চালু হলে শুধু status বদলান: 'coming_soon' -> 'live'
const FARMS = [
  { id: 'layer',   name: 'লেয়ার মুরগি',   subtitle: 'ডিম উৎপাদন',    status: 'live',        path: 'layer/' },
  { id: 'broiler', name: 'ব্রয়লার মুরগি', subtitle: 'মাংস উৎপাদন',   status: 'coming_soon', path: 'broiler/' },
  { id: 'cattle',  name: 'গরুর খামার',     subtitle: 'দুধ ও গরু পালন', status: 'coming_soon', path: 'cattle/' },
  { id: 'fish',    name: 'মাছের খামার',    subtitle: 'মাছ চাষ',        status: 'coming_soon', path: 'fish/' }
];
