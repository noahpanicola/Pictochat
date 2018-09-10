/* Insert Users */
insert into dev.user (firstName, lastName, email, phone, authToken, profilePicUrl)
values ('Noah', 'Panicola', 'noahpanicola@gmail.com', '314-769-1277', '0fi29jc02dk02', 'default_profile_image.png');

insert into dev.user (firstName, lastName, email, phone, authToken, profilePicUrl)
values ('HG', 'King', 'hgking@gmail.com', '314-837-1284', '032ud0j20kx0e2ifj0', 'default_profile_image.png');

insert into dev.user (firstName, lastName, email, phone, authToken, profilePicUrl)
values ('Darrell', 'Martin', 'darrellmartin@gmail.com', '314-456-7891', '9802j0ffj4379hv', 'default_profile_image.png');

insert into dev.user (firstName, lastName, email, phone, authToken, profilePicUrl)
values ('Olivia', 'Ledford', 'olivialedford@gmail.com', '314-466-7891', 'fdmiwojvfjeqocw0', 'default_profile_image.png');

insert into dev.user (firstName, lastName, email, phone, authToken, profilePicUrl)
values ('Jason', 'Weinzierl', 'jasonweinzierl@gmail.com', '314-476-7891', '0209cjwkjcpwncw', 'default_profile_image.png');

/* Insert Canvas Objects */
insert into dev.pageobjects (type) values ('Rectangle');
insert into dev.pageobjects (type) values ('Image');
insert into dev.pageobjects (type) values ('Video');
insert into dev.pageobjects (type) values ('Triangle');
insert into dev.pageobjects (type) values ('Circle');

/* Insert Canvas Object Table */
insert into dev.pageobject (type, xPos, yPos, props) values ('Rectangle', 10.0, 20.0, '{
  "color":"blue",
  "width": "100px",
  "height": "200px"
}');

insert into dev.pageobject (type, xPos, yPos, props) values ('Rectangle', 75.0, 75.0, '{
  "color":"red",
  "width": "200px",
  "height": "500px"
}');

/* Insert to Canvas Table */
insert into dev.canvas (transform, pixels, props) values ('1', '{"(1,2)","(3,4)","(5,6)"}', '{
    "color":"green",
    "border": "solid cyan 2px",
    "width": "all",
    "height": "all"
}');

/* Insert a Page */
insert into dev.page (ownerID, canvasList, pageobjects) values (1, '{1}', '{1, 2}');

/* Insert a Notebook */
insert into dev.notebook (ownerID, pages, users, title, category, description, isSharing, shareToken, props)
values (
  1, '{1}', '{2,3}', 'Test Notebook', 'Computer Science',
  'This is my first notebook', true, 'djfasopcjwqj02j80podj9810j', '{"color":"blue"}'
);

/* Insert Settings -- These won't be accessible from the API */
insert into dev.settings (category, name, value, description)
values ('Security', 'Authentication', 'OFF', 'Turns authentication on or off. Only use in a dev environment');

insert into dev.settings (category, name, value, description)
values ('Application', 'Mode', 'DEV', 'DEV mode or PROD mode change some site settings');

insert into dev.settings (category, name, value, description)
values ('Application', 'SiteName', 'Pictochat', 'Sets the name of the website');
