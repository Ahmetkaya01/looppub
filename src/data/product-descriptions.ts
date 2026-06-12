/**
 * Ürün açıklamaları overlay'i.
 *
 * menu.json her POS senkronunda (scripts/sync-menu.mjs) üzerine yazıldığı için
 * açıklamalar burada tutulur ve `getMenuCategories()` içinde merge edilir.
 * Anahtar: menu.json'daki `products[].id`. POS'tan dolu bir `description`
 * gelirse o öncelikli olur; buradaki değer yalnızca null olanlarda kullanılır.
 */
export const PRODUCT_DESCRIPTIONS: Record<number, string> = {
  // ── Sıcak Kahveler ──────────────────────────────────────────────
  3: "Közde pişmiş, bol köpüklü geleneksel lezzet.",
  4: "Dibekte dövülmüş, yumuşak içimli yöresel kahve.",
  5: "Menengiç meyvesinden, kafeinsiz ve aromatik.",
  6: "Yoğun ve aromatik İtalyan klasiği.",
  7: "Çift shot espresso, tam kıvamında yoğunluk.",
  8: "Espresso üzerine bir tutam krem şanti.",
  9: "Espresso ve bol buharlanmış süt.",
  10: "Karamel dokunuşlu, yumuşak içimli latte.",
  11: "Espresso, çikolata ve sütün buluşması.",
  12: "Beyaz çikolatalı, kadifemsi mocha.",
  13: "Yoğun espresso, ince süt köpüğü.",
  14: "Baharatlı çay harmanı ve buharlanmış süt.",
  15: "Vanilyalı dondurma üzerine sıcak espresso.",
  16: "Espressonun sade ve dengeli hali.",
  17: "Günün her saati taze demleme.",
  18: "Espresso üzerine bir tutam süt köpüğü.",

  // ── Bitki Çayları ───────────────────────────────────────────────
  63: "Demli, tavşan kanı klasik çay.",
  64: "Taze nane ve limonla ferahlatıcı demleme.",
  65: "Baharat ve meyve dolu, içinizi ısıtan harman.",
  66: "Sakinleştirici ıhlamur, bal ile mükemmel uyum.",
  67: "Hafif ve ferahlatıcı yeşil çay.",
  68: "Böğürtlen aromalı, meyvemsi bitki çayı.",
  69: "Rahatlatıcı, hafif çiçeksi papatya demlemesi.",

  // ── Soğuk İçecekler ─────────────────────────────────────────────
  70: "Soğuk servis edilen doğal kaynak suyu.",
  71: "Doğal mineralli, ferahlatıcı maden suyu.",
  72: "Meyve aromalı serinletici maden suyu.",
  73: "Buz gibi servis edilen klasik kola.",
  74: "Portakal aromalı gazlı içecek.",
  75: "Limon aromalı ferahlatıcı gazoz.",
  76: "Geceye enerji katan klasik enerji içeceği.",
  77: "Lime ve nane ile buz gibi ferahlık.",
  78: "Hibiskus ve orman meyveli serinlik.",
  79: "Taze nane ve lime ferahlığı, alkolsüz.",
  80: "Günlük sıkım, taze ev yapımı limonata.",
  215: "Küçük boy klasik enerji içeceği.",

  // ── Soğuk Kahveler ──────────────────────────────────────────────
  19: "Buz üzerine espresso ve soğuk süt.",
  20: "Karamelli, buz gibi yumuşak latte.",
  21: "Çikolata ve espressonun soğuk buluşması.",
  22: "Beyaz çikolatalı, serinletici ice mocha.",
  23: "Buz üzerine sade, yoğun espresso.",
  24: "Soğuk servis edilen taze filtre kahve.",
  25: "Soğuk süt köpüğüyle hafif espresso.",

  // ── Frappe ──────────────────────────────────────────────────────
  26: "Karamel soslu, buz gibi kahve keyfi.",
  27: "Yoğun çikolatalı, kremamsı soğuk içecek.",
  28: "Taze çilek aromalı serinletici frappe.",
  29: "Oreo parçacıklı, kremamsı frappe.",
  30: "Vanilya aromalı, yumuşak içimli frappe.",

  // ── Milkshake ───────────────────────────────────────────────────
  31: "Bol çikolatalı, yoğun kıvamlı milkshake.",
  32: "Klasik vanilya aromalı, kremamsı milkshake.",
  33: "Taze çilekli, ipeksi milkshake.",
  34: "Karışık orman meyveleriyle ferah milkshake.",
  35: "Tropikal mango aromalı dolgun milkshake.",
  36: "Oreo parçalı, doyurucu milkshake.",

  // ── Smoothie ────────────────────────────────────────────────────
  37: "Taze çilekle hazırlanan yoğun smoothie.",
  38: "Muzun kremamsı tatlılığıyla doyurucu smoothie.",
  39: "Orman meyveli, vitamin dolu smoothie.",
  40: "Kivinin ekşi ferahlığıyla canlandırıcı smoothie.",
  41: "Tropikal mango ile güneşli bir smoothie.",

  // ── Frozen ──────────────────────────────────────────────────────
  42: "Ekşi yeşil elmalı, buzlu serinlik.",
  43: "Çilekli, buz gibi yaz klasiği.",
  44: "Kivili, ferahlatıcı buzlu içecek.",
  45: "Mangolu, tropikal buzlu serinlik.",
  46: "Orman meyveli, buzlu ferahlık.",

  // ── Kokteyller ──────────────────────────────────────────────────
  142: "Votka, cranberry ve lime zarafeti.",
  203: "Viski, limon ve şekerin klasik dengesi.",
  150: "Jack Daniel's ve limonata ferahlığı.",
  149: "Vanilyalı votka, passion fruit ve prosecco.",
  148: "Whiskey sour üzerine kırmızı şarap dokunuşu.",
  147: "Votka, ahududu likörü ve ananas.",
  146: "Votka ve taze espressonun şık buluşması.",
  145: "Rom, lime ve şekerin Küba klasiği.",
  144: "Cin, ahududu ve ipeksi köpük.",
  143: "Cachaça, lime ve şekerle Brezilya ruhu.",
  47: "Beş farklı içkiyle güçlü bir klasik.",
  62: "Votka, şeftali likörü ve meyve suları.",
  61: "Aperol, prosecco ve soda ile İtalyan ferahlığı.",
  57: "Taze nane, lime ve beyaz rom.",
  56: "Rom, kola ve lime üçlüsü.",
  52: "Tekila, lime ve tuz kenarlı klasik.",
  51: "Cin, Campari ve vermutun İtalyan klasiği.",
  50: "Votka ve vermutla sade şıklık.",
  49: "Cin ve vermutun zamansız zarafeti.",
  48: "Rom, hindistancevizi ve ananas tropiği.",

  // ── Loop İmza Kokteyller ────────────────────────────────────────
  247: "Mekânın imzası, sürprizli özel karışım.",
  151: "Meyvemsi ve baştan çıkarıcı imza kokteyl.",
  152: "Viski bazlı, meyvemsi imza karışım.",
  153: "Güçlü karakterli, baharatlı imza kokteyl.",
  154: "Ekşi dengeli, ipeksi imza sour.",
  155: "Hafif, çiçeksi ve zarif imza kokteyl.",

  // ── Alkolsüz Kokteyller ─────────────────────────────────────────
  167: "Nane ve lime ferahlığı, alkolsüz.",
  168: "Hindistancevizi ve ananas, alkolsüz tropik.",
  169: "Meyveli, ferahlatıcı alkolsüz imza içecek.",
  170: "Rengârenk katmanlı, meyveli serinlik.",
  171: "Masmavi, tropikal alkolsüz ferahlık.",
  172: "Kırmızı meyveli, canlandırıcı alkolsüz karışım.",

  // ── İkili Karışım ───────────────────────────────────────────────
  224: "Hindistancevizli rom ve kola uyumu.",
  233: "Cin ve taze meyve suyu.",
  232: "Viski ve meyve suyunun yumuşak uyumu.",
  231: "Votka ve taze meyve suyu.",
  230: "Votka ve tonik, sade ferahlık.",
  229: "Cin ve tonik, limonlu klasik.",
  228: "Jägermeister ve portakallı gazoz.",
  227: "Votka ve portakal aromalı gazoz.",
  226: "Cin ve limonlu gazozun ferahlığı.",
  225: "Votka ve limonlu gazoz serinliği.",
  173: "Bol buz ve limonla klasik cin tonik.",
  223: "Jägermeister ve kolanın güçlü uyumu.",
  222: "Hindistancevizli rom, portakal ve nar şurubu.",
  221: "Tekila, portakal suyu ve nar şurubu.",
  178: "Jägermeister ve enerji içeceği karışımı.",
  177: "Votka ve vişne suyunun tatlı uyumu.",
  176: "Votka ve enerji içeceği karışımı.",
  175: "Viski ve enerji içeceğinin sert uyumu.",
  174: "Viski ve kolanın vazgeçilmez ikilisi.",

  // ── Biralar ─────────────────────────────────────────────────────
  82: "Buz gibi servis edilen klasik pilsner.",
  81: "Yoğun malt karakterli yerli klasik.",
  88: "Yumuşak içimli, İrlanda esintili bira.",
  83: "Filtre edilmemiş, dolgun gövdeli yerli bira.",
  90: "Lime dilimiyle servis edilen Meksika lager'ı.",
  159: "Dengeli ve ferah Danimarka pilsneri.",
  162: "Altın sarısı, dolgun içimli lager.",
  236: "Sert karakterli Alman pilsneri.",
  235: "Küçük boy, ferah Tuborg keyfi.",
  234: "Küçük boy klasik Efes pilsner.",
  217: "Lime ile servis edilen Meksika usulü bira.",
  216: "Glutensiz, hafif içimli pilsner.",
  213: "Dünyaca ünlü Hollanda lager'ı.",
  165: "Hafif, aromatik ve ferah içimli bira.",
  164: "Filtresiz, bulanık ve dolgun lager.",
  163: "Karamelize maltlı, kehribar renkli bira.",
  161: "Narenciye aromalı Fransız buğday birası.",
  160: "Buz süzme, yumuşak içimli lager.",
  158: "Yerel üretim IPA, wheat IPA ve lager seçkisi.",
  157: "Hafif ve ferah Meksika lager'ı.",
  156: "Tekila aromalı, cesur karakterli bira.",
  89: "Hafif içimli Amerikan lager'ı.",
  84: "Yumuşak içimli Amerikan pilsneri.",

  // ── Viskiler ────────────────────────────────────────────────────
  92: "12 yıllık İskoç harman viskisi, 100 ml.",
  93: "12 yıllık İskoç harman viskisi, 70 ml.",
  94: "12 yıllık İskoç harman viskisi, 50 ml.",
  95: "12 yıllık İskoç harman viskisi, 35 ml.",
  96: "Yumuşak içimli Tennessee viskisi, 100 ml.",
  97: "Yumuşak içimli Tennessee viskisi, 70 ml.",
  98: "Yumuşak içimli Tennessee viskisi, 50 ml.",
  99: "Yumuşak içimli Tennessee viskisi, 35 ml.",
  100: "Tek kadeh viski servisi.",
  101: "Çift ölçü viski servisi.",
  205: "Tek ölçü, içinizi ısıtan konyak.",
  206: "Çift ölçü yumuşak konyak keyfi.",

  // ── Rakılar ─────────────────────────────────────────────────────
  102: "Üzüm suması ağırlıklı, yumuşak içimli rakı.",
  103: "Çift ölçü Beylerbeyi keyfi.",
  104: "Dinlendirilmiş, dengeli anason karakteri.",
  105: "Çift ölçü Efe Gold rakı.",

  // ── Votkalar & Tekila & Cin ─────────────────────────────────────
  107: "Saf ve dengeli İsveç votkası.",
  112: "Üç kez damıtılmış klasik votka, 100 ml.",
  116: "Mavi agaveden Meksika tekilası, 70 ml.",
  141: "Ardıç aromalı klasik London Dry cin.",
  194: "Tek kadeh servis.",
  195: "Çift ölçü servis.",
  204: "Mavi agave tekilası, büyük ölçü.",
  219: "Tek shot ölçüsünde Olmeca tekila.",
  220: "Mavi agave tekilası, 50 ml.",

  // ── Şaraplar ────────────────────────────────────────────────────
  120: "Mahlep aromalı, yöresel tatlı şarap.",
  121: "Kalecik Karası, kadife dokulu kırmızı.",
  122: "Ferah ve meyvemsi yerli beyaz şarap.",
  123: "Çilek aromalı, serin içimli roze.",
  214: "Günün şarap seçkisi için ekibimize danışın.",

  // ── Tostlar ─────────────────────────────────────────────────────
  180: "Bol kaşarlı, çıtır klasik tost.",
  181: "Kaşar ve sucukla zengin karışık tost.",
  182: "Baharatlı sucuk ve erimiş kaşar.",

  // ── Makarnalar ──────────────────────────────────────────────────
  183: "Kremalı parmesan soslu İtalyan klasiği.",
  184: "Fesleğenli pesto soslu penne.",
  185: "Köri soslu, hafif baharatlı penne.",
  186: "Dağ kekiği ve zeytinyağıyla aromatik penne.",
  187: "El açması mantı, yoğurtlu ve tereyağlı.",

  // ── Atıştırmalık Sepeti ─────────────────────────────────────────
  188: "Patates, soğan halkası ve çıtır atıştırmalıklar.",
  189: "Çıtır çıtır, altın sarısı patates.",

  // ── Shot'lar ────────────────────────────────────────────────────
  196: "Tuz ve limon eşliğinde klasik tekila.",
  197: "Buz gibi, sert ve net votka.",
  198: "Ardıç aromalı keskin cin shot'ı.",
  199: "Karamel notalı yoğun rom shot'ı.",
  200: "Tek dikim, içinizi ısıtan viski.",
  201: "Buz gibi servis edilen bitki likörü.",
  202: "Yumuşak ve ısıtan konyak shot'ı.",
  237: "Jägermeister'ın portakallı ferah yorumu.",
  238: "Soğuk kahveli Jägermeister deneyimi.",

  // ── Kuruyemiş Cips Jelibon ──────────────────────────────────────
  166: "Seçilmiş çerezlerden zengin tabak.",
  218: "Kavrulmuş, hafif tuzlu yer fıstığı.",
  241: "Baharatlı, bira dostu çıtır leblebi.",
  242: "Acılı ve çıtır, içki eşlikçisi leblebi.",
  243: "Özel soslarla servis edilen cips.",
  244: "Renkli, meyve aromalı yumuşak şeker.",

  // ── Menüler ─────────────────────────────────────────────────────
  248: "Efes Özel Seri ve atıştırmalık eşleşmesi.",
  249: "Tekila shot'ları ve eşlikçileriyle keyif seti.",

  // ── Mezeler ─────────────────────────────────────────────────────
  191: "Seçilmiş peynirler, kuruyemiş ve bal eşliğinde.",
  192: "Mevsim meyvelerinden taze ve ferah tabak.",
  193: "Çıtır havuç ve salatalık dilimleri.",
  239: "Ferah ve çıtır salatalık turşusu.",

  // ── Günün Tatlıları ─────────────────────────────────────────────
  135: "Şefin günlük tatlı seçimi.",
};
