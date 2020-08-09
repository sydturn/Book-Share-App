# Library Application
A web application where users can manage a collection of books owned by various employees in order to organize borrowing and commenting of employee owned books.

#SQL Queries for setting up mySQL db

//comments table

CREATE TABLE `tComments` (
  `comment` varchar(1500) NOT NULL,
  `commenterName` varchar(150) NOT NULL,
  `created` datetime NOT NULL,
  `commentID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`commentID`))
  
  //location types (to be baseloaded)
  
  CREATE TABLE `tLocationType` (
  `locationDescription` varchar(50) DEFAULT NULL,
  `typeID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`typeID`))
  
  //status types (to be baseloaded)
  
  CREATE TABLE `tStatusType` (
  `statusDescription` varchar(50) DEFAULT NULL,
  `typeID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`typeID`))
  
   //books table (must make location and status tables first)
 
  CREATE TABLE `tBooks` (
  `statusTypeID` int(11) NOT NULL,
  `locationTypeID` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `author` varchar(550) NOT NULL,
  `owner` varchar(150) NOT NULL,
  `bookID` int(11) NOT NULL AUTO_INCREMENT,
  `checkedOutBy` varchar(150) DEFAULT NULL,
  `checkedOutDate` datetime DEFAULT NULL,
  PRIMARY KEY (`bookID`),
  KEY `statusTypeID` (`statusTypeID`),
  KEY `locationTypeID` (`locationTypeID`),
  CONSTRAINT `tBooks_ibfk_1` FOREIGN KEY (`statusTypeID`) REFERENCES `tStatusType` (`typeID`),
  CONSTRAINT `tBooks_ibfk_2` FOREIGN KEY (`locationTypeID`) REFERENCES `tLocationType` (`typeID`))
  
  //link table for linking comments to books (one to many)
  
 CREATE TABLE `ltComments_Books` (
  `commentID` int(11) NOT NULL,
  `bookID` int(11) NOT NULL,
  PRIMARY KEY (`commentID`,`bookID`),
  KEY `bookID` (`bookID`),
  CONSTRAINT `ltComments_Books_ibfk_1` FOREIGN KEY (`commentID`) REFERENCES `tComments` (`commentID`),
  CONSTRAINT `ltComments_Books_ibfk_2` FOREIGN KEY (`bookID`) REFERENCES `tBooks` (`bookID`)
) 

//stored proceedure for adding new books

DELIMITER $$
CREATE PROCEDURE AddNewBook (
  title varchar(150),
  author varchar(550),
  Owner varchar(150), 
  locationTypeID INT,
  statusTypeID INT
)
BEGIN	
	INSERT INTO tBooks(
	`statusTypeID`,
	`locationTypeID`,
	`title`,
	`author`,
	`owner`) VALUES (statusTypeID,locationTypeID, title, author, owner);
END$$
DELIMITER ;

//store proceedure for updating books

DELIMITER $$
CREATE PROCEDURE UpdateBook (
  title varchar(150),
  author varchar(550),
  Owner varchar(150), 
  statusTypeID INT,
  incBookID INT
)
BEGIN	
	UPDATE tBooks 
	SET `title` = title, `author`= author,`owner`= Owner, `statusTypeID` = statusTypeID 
	WHERE bookID = incBookID;
END$$
DELIMITER ;

//stored proceedure for adding comments and associating them to their books

DELIMITER $$
CREATE PROCEDURE AddNewComment (
   comment varchar(1500),
   commenterName varchar(150),
   bookID INT
)
BEGIN
	INSERT INTO tComments(
	`comment`,
    `commenterName`,
	`created`) VALUES (comment, commenterName, NOW());
	SET @commentID = LAST_INSERT_ID();
	INSERT INTO ltComments_Books(`commentID`, `bookID`) VALUES (@commentID, bookID);
END$$
DELIMITER ;

//stored proceedure for checking out a book
  
DELIMITER $$
CREATE PROCEDURE CheckoutBook (
   checkedOutBy varchar(150),
   locationTypeID INT,
   statusTypeID INT, 
   incBookID INT
)
BEGIN
	UPDATE tBooks SET `statusTypeID` = statusTypeID, `locationTypeID` = locationTypeID, `checkedOutBy`=checkedOutBy, checkedOutDate=NOW() WHERE bookID = incBookID;
END$$
DELIMITER ;

#Baseloads 

NOTE: Baseload tStatus and tLocationType type with soeme values. In my case they are as follows (keep in mind these tables auto increment, so insert them in the order you wish their values to be OR remove the auto incrementation feature when creating the tables):

    Available         |      1 
    Checked Out       |      2 
    Damaged           |      3
    Digital Copy      |      4

    In Office         |      1 
    Owner's Home      |      2 
    In the Matrix     |      3

