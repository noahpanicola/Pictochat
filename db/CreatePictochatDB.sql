create database pictochat;
drop schema dev cascade;
create schema dev;

create table dev.user (
  userID        serial primary key,
  firstName     varchar(50) not null,
  lastName      varchar(50) not null,
  email         varchar(200) not null unique,
  phone         varchar(13) default null,
  dateCreated   timestamp not null default NOW(),
  lastActive    timestamp not null default NOW(),
  authToken     varchar(255) not null,
  profilePicUrl varchar(255) default null,
  thumbPicUrl   varchar(255) default null,
  isActive      boolean default true,
  props         jsonb
);

create table dev.pageobjects (
  type          varchar(50) primary key,
  description   varchar(100) default null
);

create table dev.pageobject (
  pageobjectID    serial primary key,
  type            varchar(50) references dev.pageobjects (type),
  xPos            float8 not null,
  yPos            float8 not null,
  dateCreated     timestamp not null default NOW(),
  props           jsonb default null
);

create table dev.canvas (
  canvasID      serial primary key,
  transform     varchar(30),
  pixels        point[],
  dateCreated   timestamp not null default NOW(),
  props         jsonb
);

create table dev.page (
  pageID          serial primary key,
  ownerID         int not null references dev.user (userID),
  canvasList      int[],
  pageobjects     int[],
  dateCreated     timestamp not null default NOW(),
  lastEdited      timestamp not null default NOW(),
  props           jsonb
);

create table dev.notebook (
  notebookID    serial primary key,
  ownerID       int references dev.user (userID),
  pages         int[] default null,
  users         int[] default null,
  dateCreated   timestamp not null default NOW(),
  lastEdited    timestamp not null default NOW(),
  title         varchar(100) not null,
  category      varchar(100) default null,
  description   varchar(100) default null,
  isActive      boolean not null default true,
  isSharing     boolean not null default false,
  shareToken    varchar(255) not null,
  props         jsonb
);

create table dev.settings (
  settingID     serial primary key,
  category      varchar(50) not null,
  name          varchar(50) not null,
  value         varchar(50) not null,
  description   varchar(100) not null
);
