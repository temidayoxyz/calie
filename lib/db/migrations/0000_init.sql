CREATE TABLE `user` (
  `id` text PRIMARY KEY NOT NULL,
  `name` text,
  `email` text NOT NULL,
  `emailVerified` integer,
  `image` text,
  `passwordHash` text,
  `created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);

CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);

CREATE TABLE `account` (
  `userId` text NOT NULL,
  `type` text NOT NULL,
  `provider` text NOT NULL,
  `providerAccountId` text NOT NULL,
  `refresh_token` text,
  `access_token` text,
  `expires_at` integer,
  `token_type` text,
  `scope` text,
  `id_token` text,
  `session_state` text,
  PRIMARY KEY (`provider`, `providerAccountId`),
  FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE TABLE `session` (
  `sessionToken` text PRIMARY KEY NOT NULL,
  `userId` text NOT NULL,
  `expires` integer NOT NULL,
  FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE TABLE `verificationToken` (
  `identifier` text NOT NULL,
  `token` text NOT NULL,
  `expires` integer NOT NULL,
  PRIMARY KEY (`identifier`, `token`)
);

CREATE TABLE `booking_page` (
  `id` text PRIMARY KEY NOT NULL,
  `userId` text NOT NULL,
  `slug` text NOT NULL,
  `headline` text NOT NULL,
  `bio` text,
  `brand_color` text DEFAULT '#235347' NOT NULL,
  `created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
  FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE UNIQUE INDEX `booking_page_slug_unique` ON `booking_page` (`slug`);
