package beans;

import java.util.ArrayList;
import java.util.Date;

import enums.Gender;
import enums.Role;

public class User {
	private Boolean deleted;
	private Boolean blocked;
	
	private String username; //jedinstveno!!!!
	private String password;
	private String name;
	private String surname;
	private Gender gender;
	private Date birthday;
	private Role role;
	private Address address;
	
	//kupac
	private ArrayList<Integer> orderIds; //poruzbine za kupca i za dostavljaca
	private int chartId;
	private double points;
	private Customer typeCustomer;
	
	//menadzer
	private int idRestaurant;	
}
