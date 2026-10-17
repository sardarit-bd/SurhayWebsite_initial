---
title: 'Erişilebilir web sitesi: BFSG şirketler için ne anlama geliyor'
category: 'Erişilebilirlik'
author: 'Surhay'
date: 2026-06-18
metaTitle: 'BFSG ve erişilebilir siteler: kimi kapsıyor ve ne yapmak gerekiyor'
metaDescription: 'Haziran 2025’ten beri Almanya’da Erişilebilirliği Güçlendirme Yasası yürürlükte. Kimin kapsandığı, hangi gerekliliklerin somut olarak geçerli olduğu ve makul bir emekle nelerin uygulanabileceği.'
ogImage: '/og-default.png'
---

28 Haziran 2025’ten beri Almanya’da Erişilebilirliği Güçlendirme Yasası (BFSG) yürürlüktedir. Avrupa Erişilebilirlik Yasası’nı ulusal hukuka aktarır ve ilk kez yalnızca kamu kurumlarını değil, özel şirketleri de kapsar. Pek çok site sahibi bunu duymuştur ama kapsama girip girmediğini bilmez. Bu yazı ikisini de netleştiriyor: kapsam sorusunu ve somut olarak ne yapılması gerektiği sorusunu.

## Kim kapsanıyor — kim kapsanmıyor

Yasa, elektronik ticaretteki ürünler ve hizmetler için geçerlidir. Basitleştirirsek: sitenizde bir sözleşme kurulabiliyorsa — bir satın alma, bir rezervasyon, bir abonelik — uygulama alanına girersiniz.

Küçük şirketler için iki istisna önemlidir:

- **Mikro işletmeler**, yani ondan az çalışanı *ve* en fazla iki milyon euro yıllık cirosu olanlar, hizmetler bakımından kapsam dışındadır.
- **Sözleşme kurulmayan salt bilgi siteleri** kapsama girmez. Hizmet listesi ve iletişim formu olan bir usta sitesi elektronik ticaret değildir.

„Ve“ ifadesi kritiktir: on iki çalışanı olan bir işletme, cirosu düşük olsa bile artık mikro işletme değildir.

## İstisna neden yine de bir muafiyet belgesi değil

BFSG kapsamına girmeyenlerin de yine de erişilebilir kurmak için üç iyi nedeni var.

Birincisi erişim genişliği. Almanya’da yaklaşık 7,8 milyon kişi tanınmış ağır engelle yaşıyor. Buna geçici olarak kısıtlananlar da ekleniyor — kolu kırık olanlar, kavurucu güneşte telefona bakanlar, kulaklıksız gürültülü bir trende olanlar. Erişilebilirlik nadiren azınlık için özel bir çözümdür; çoğu zaman herkes için daha iyi bir çözümdür.

İkincisi teknik. Bir sayfayı erişilebilir kılan şeylerin neredeyse tamamı onu arama motorları için de daha okunur kılar: temiz bir başlık hiyerarşisi, konuşan bağlantı metinleri, görseller için alternatif metinler, anlamsal HTML. Google sitenizi aşağı yukarı bir ekran okuyucunun gördüğü gibi görür.

Üçüncüsü ihale pratiği. Kamu kurumlarına tedarik yapan ya da büyük şirketlerle çalışan biri, erişilebilirliği giderek daha sık şartnamede bir gereklilik olarak buluyor — yasanın kapsayıp kapsamadığından bağımsız olarak.

## Somut olarak ne isteniyor

Teknik temel, esas olarak WCAG’ye AA uygunluk düzeyinde atıf yapan uyumlaştırılmış Avrupa normu EN 301 549’dur. Kural setini dört ilke taşır: algılanabilir, kullanılabilir, anlaşılabilir, sağlam.

Pratikte çoğu site aynı beş noktada kalır:

**Kontrastlar.** Normal metin arka planla en az 4,5:1, büyük yazı 3:1 kontrast oranına ihtiyaç duyar. Beyaz zemindeki açık gri gövde metinleri — pek çok temanın varsayılan ayarı — bunu düzenli olarak ihlal eder.

**Klavyeyle kullanım.** Her işlev faresiz erişilebilir olmalı ve odak görünür olmalıdır. En sık yapılan hata, birinin mavi çerçeve rahatsız ettiği için CSS’ten sildiği bir `outline: none`’dur.

**Alternatif metinler.** İçerik taşıyan her görselin bir açıklamaya ihtiyacı vardır. Dekoratif görseller boş bir `alt=""` alır — hiç öznitelik almamak değil.

**Formlar.** Her alanın bağlantılı bir etikete ihtiyacı vardır. Alandaki yer tutucu metin etiket değildir: yazmaya başlayınca kaybolur ve ekran okuyucular onu güvenilmez biçimde okur.

**Yapı.** Sayfa başına bir H1, ardından atlamasız bir hiyerarşi. Başlıklar yazı boyutu değil, gezinmedir.

## Erişilebilirlik beyanı

Kapsanan sağlayıcılar, erişilebilirliğin durumunu anlatan, bilinen kısıtları adlandıran ve geri bildirim için bir iletişim yolu veren bir beyan yayımlamak zorundadır. Bu beyan kalıcı olarak erişilebilir bir yerde durmalıdır — genellikle künye ve gizlilik metninin yanında, alt bilgide.

Eksikleri adıyla anan dürüst bir beyan, hukuken güzelleştirilmiş olandan iyidir. Konuyla ilgilendiğinizi belgeler.

## Bunun emek karşılığı ne

Yeni kurulan bir sitede erişilebilirlik neredeyse bedavadır — baştan itibaren hesaba katılması koşuluyla. Kontrastları tasarım sisteminde belirlemek, anlamsal HTML yazmak, odak durumlarını tasarlamak: bu, kavram aşamasında günler değil saatler alır.

Pahalı olan sonradan eklemektir. Her öğenin kendi işaretlemesini getirdiği, otuz eklentili mevcut bir site noktasal olarak onarılamaz. Sıklıkla yeniden kurmak, tadilattan hem ucuzdur hem hızlıdır.

Gerçekçi bir başlangıç şöyle görünür: önce otomatik bir araçla ölçün (axe DevTools ya da Lighthouse sorunların yaklaşık yüzde 30–40’ını bulur), sonra sayfayı bir kez baştan sona klavyeyle kullanın, sonra bulunan noktaları ağırlığa göre sıralayın. Önce kontrastlar ve klavyeyle kullanım — bunlar tüm sayfaları aynı anda ilgilendirir.

## Akılda kalması gerekenler

Önce sitenizin gerçekten sözleşme kurup kurmadığını inceleyin. Durum buysa ve mikro işletme değilseniz, erişilebilirlik sizin için artık isteğe bağlı değildir. Durum bu değilse, emek–etki oranı iyi bir yatırım olarak kalır: daha kolay bulunurluk, daha geniş erişim ve beş yıl sonra da kullanılabilir bir site.
