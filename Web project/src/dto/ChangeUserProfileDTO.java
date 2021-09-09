package dto;

import java.util.Date;

import enums.Gender;

public class ChangeUserProfileDTO {
	public String username;
	public String name;
	public String surname;
	public String street;
	public int number;
	public String city;
	public int zipCode;
	public Gender gender;
	public Date birthday;
}
