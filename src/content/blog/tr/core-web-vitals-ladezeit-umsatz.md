---
title: 'Core Web Vitals: yüklenme süresi neden ciroyu belirler'
category: 'Performans'
author: 'Surhay'
date: 2026-04-28
metaTitle: 'Core Web Vitals açıklandı: yüklenme süresi, sıralamalar ve ciro'
metaDescription: 'Yüklenme süresindeki her saniye dönüşüme mal olur. LCP, INP ve CLS’in arkasında ne var, Google bunları neden ölçüyor — ve değerlerinizi somut olarak nasıl iyileştirirsiniz.'
ogImage: '/og-default.png'
---

Amazon bunu yıllar önce hesaplamıştı: 100 milisaniyelik ek yüklenme süresi yüzde bir ciroya mal oluyor. Sizin siteniz için de aynı mekanik geçerli, hatta daha acımasız — çünkü Amazon’un aksine sizde yavaş sayfaları affeden bir müşteri bağlılığı yok. Bir Google sonucuna tıklayıp üç saniye beyaz ekrana bakan kişi gitmiştir.

## Google’ın ölçtüğü üç değer

**LCP (Largest Contentful Paint)**, ana içeriğin ne zaman göründüğünü ölçer. Hedef: 2,5 saniyenin altı. En sık katil: devasa, optimize edilmemiş görseller.

**INP (Interaction to Next Paint)**, sayfanın tıklamalara ve girdilere ne kadar hızlı yanıt verdiğini ölçer. Hedef: 200 milisaniyenin altı. En sık katil: fazla JavaScript — çoğu zaman izleme betikleri ve sayfa kuruculardan.

**CLS (Cumulative Layout Shift)**, yüklenirken içeriklerin zıplayıp zıplamadığını ölçer. Herkes bilir: tıklamak istersiniz, buton kayar. Hedef: 0,1’in altı.

## Gerçekten işe yarayanlar — bu sırayla

1. **Görseller WebP ya da AVIF formatında**, doğru boyutlandırılmış, geç yüklemeli. Yalnızca bu bile çoğu sitede sorunların yarısını çözer.
2. **JavaScript’i radikal biçimde azaltın.** Her eklenti, her izleyici, her animasyon kütüphanesi bir bedel taşır. Statik üretilen sayfalar (Astro’daki gibi) burada, sayfa kurucu kullanan WordPress’e göre yapısal olarak daha iyi değerler verir.
3. **Yazı tiplerini kendiniz barındırın** ve `font-display: swap` ile yükleyin — Google Fonts beklemek yok.
4. **Önbellek ve CDN** — iyi bir barındırmada zaten dahildir.

## Tahmin değil, ölçüm

Sitenizi [PageSpeed Insights](https://pagespeed.web.dev) ile test edin — yalnızca laboratuvar ölçümü değil, gerçek saha verisi. Değerler 90’ın altında mı? O zaman orada ciro yolda kalıyor demektir. Projelerimizi 95+ Lighthouse puanıyla teslim ediyoruz — gösteriş için değil, bu rakamlar doğrudan sıralamalara ve dönüşüme yazıldığı için.
