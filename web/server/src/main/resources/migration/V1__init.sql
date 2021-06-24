CREATE TABLE IF NOT EXISTS Roles
(
    RoleId BIGINT      NOT NULL AUTO_INCREMENT,
    Name   VARCHAR(64) NOT NULL UNIQUE,
    PRIMARY KEY (RoleId)
);

INSERT INTO Roles(Name)
VALUES ('ADMIN'),
       ('USER'),
       ('NOT_VERIFIED');

CREATE TABLE IF NOT EXISTS Users
(
    UserId   BIGINT       NOT NULL AUTO_INCREMENT,
    Email    VARCHAR(128) NOT NULL UNIQUE,
    Password VARCHAR(128) NOT NULL,
    Name     VARCHAR(128),
    Surname  VARCHAR(128),
    RoleId   BIGINT       NOT NULL,
    Provider VARCHAR(32)  NOT NULL,
    PRIMARY KEY (UserId),
    FOREIGN KEY (RoleId) REFERENCES Roles (RoleId)
);

CREATE TABLE IF NOT EXISTS Portals
(
    PortalId     INTEGER      NOT NULL AUTO_INCREMENT,
    Name         VARCHAR(128) NOT NULL UNIQUE,
    Link         VARCHAR(128) NOT NULL,
    ScrapDate    DATETIME,
    LastResponse INTEGER,
    Code         VARCHAR(128) NOT NULL UNIQUE,
    Logo         VARCHAR(128),
    PRIMARY KEY (PortalId)
);

INSERT INTO Portals(Name, Link, Logo, Code)
VALUES ('Dobre ziele', 'https://dobreziele.pl', 'https://dobreziele.pl/tpl/modern/img/logo.png',
        'DOBRE_ZIELE'),
       ('Un-mate', 'https://www.un-mate.pl',
        'https://un-mate.pl/bundles/_themes/unmate/unmate-theme/app/images/logo_unmate.png?20210416v1',
        'UN_MATE'),
       ('Poyerbani', 'https://www.poyerbani.pl',
        'https://www.poyerbani.pl/data/gfx/mask/pol/logo_1_big.png', 'POYERBANI');

CREATE TABLE IF NOT EXISTS Offers
(
    OfferId  BIGINT       NOT NULL AUTO_INCREMENT,
    Name     VARCHAR(128) NOT NULL,
    Amount   INTEGER      NOT NULL,
    Price    DOUBLE       NOT NULL,
    Image    VARCHAR(128) NOT NULL,
    Link     VARCHAR(128) NOT NULL,
    PortalId INTEGER      NOT NULL,
    PRIMARY KEY (OfferId),
    FOREIGN KEY (PortalId) REFERENCES Portals (PortalId)
);

CREATE TABLE IF NOT EXISTS Duplicates
(
    DuplicateId BIGINT       NOT NULL AUTO_INCREMENT,
    Price       DOUBLE       NOT NULL,
    OfferId     BIGINT       NOT NULL,
    Link        VARCHAR(128) NOT NULL,
    PortalId    INTEGER      NOT NULL,
    PRIMARY KEY (DuplicateId),
    FOREIGN KEY (OfferId) REFERENCES Offers (OfferId),
    FOREIGN KEY (PortalId) REFERENCES Portals (PortalId)
);

CREATE TABLE IF NOT EXISTS VerificationTokens
(
    Token      VARCHAR(124) UNIQUE NOT NULL,
    UserId     BIGINT              NOT NULL,
    ExpiryDate DATETIME            NOT NULL,
    RoleId     BIGINT              NOT NULL,
    PRIMARY KEY (Token),
    FOREIGN KEY (UserId) REFERENCES Users (UserId)
);

CREATE TABLE IF NOT EXISTS Filters
(
    FilterId    BIGINT       NOT NULL AUTO_INCREMENT,
    FilterName  VARCHAR(124) NOT NULL,
    PriceFrom   DOUBLE,
    PriceTo     DOUBLE,
    AmountFrom  INTEGER,
    AmountTo    INTEGER,
    ProductName VARCHAR(124),
    Portal      VARCHAR(124),
    UserId      BIGINT       NOT NULL,
    PRIMARY KEY (FilterId),
    FOREIGN KEY (UserId) REFERENCES Users (UserId)
);

CREATE TABLE IF NOT EXISTS Favourites
(
    FavouriteId BIGINT  NOT NULL AUTO_INCREMENT,
    isFavourite BOOLEAN NOT NULL DEFAULT FALSE,
    Comment     TEXT,
    StarPoints  DOUBLE,
    UserId      BIGINT  NOT NULL,
    OfferId     BIGINT  NOT NULL,
    DateCreated DATETIME NOT NULL,
    PRIMARY KEY (FavouriteId),
    FOREIGN KEY (UserId) REFERENCES Users (UserId),
    FOREIGN KEY (OfferId) REFERENCES Offers (OfferId)
);