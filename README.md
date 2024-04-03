# Library Management System

Back-End Developer Case Study (Invent Analytics)

Bu proje Node.js, Express.js, TypeORM, SQLite, Joi, Swagger ve TypeScript kullanılarak geliştirilmiş basit bir kütüphane yönetim sistemidir.

## Kullanılan Teknolojiler

- Node.js
- Express.js
- TypeORM
- SQLite
- Joi
- Swagger
- TypeScript

## Kurulum

Proje bağımlılıklarını kurmak için aşağıdaki komutu çalıştırın:

```bash
npm install

```

## Çalıştırma

```bash
npm start
```

Sunucu http://localhost:3000 adresinde çalışmaya başlayacaktır. Swagger API dokümantasyonuna http://localhost:3000/api-docs adresinden erişebilirsiniz.

## SQLite Veritabanını Görsel Olarak İncelemek

Proje veritabanını görsel olarak incelemek ve yönetmek için "DB Browser for SQLite" aracını kullanabilirsiniz. Bu araç, SQLite veritabanı dosyalarınızla etkileşim kurmanıza olanak tanır ve aşağıdaki özelliklere sahiptir:

- Tablo oluşturma ve düzenleme
- Veritabanı şemasını görselleştirme
- SQL sorguları yazma ve çalıştırma
- Veritabanı içeriğini görüntüleme ve düzenleme

### DB Browser for SQLite'ı Kurma

DB Browser for SQLite'ı resmi web sitesinden indirip kurabilirsiniz:

[DB Browser for SQLite İndirme Sayfası](https://sqlitebrowser.org/dl/)

## SQLite Veritabanı Dosyası

Uygulama çalıştırıldığında, SQLite veritabanı dosyası projenin kök dizininde `path/to/database.sqlite` konumunda oluşturulacaktır. Bu veritabanı dosyası, uygulamanın tüm verilerini içerir ve DB Browser for SQLite kullanılarak incelenebilir.

### Veritabanı Dosyasına Erişim

1. DB Browser for SQLite'ı açın.
2. "File" > "Open Database" seçeneklerini izleyerek açılacak pencereden `path/to/database.sqlite` dosyasını bulun.
3. Bulunduğunuz dizinde `path/to/database.sqlite` dosyasını seçin ve "Open" butonuna tıklayarak veritabanı dosyasını açın.

Bu adımlarla, uygulamanızın oluşturduğu SQLite veritabanı dosyasına erişebilir ve DB Browser for SQLite aracılığıyla veritabanı içeriğini görsel olarak inceleyebilirsiniz.


