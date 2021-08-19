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

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	public Boolean getBlocked() {
		return blocked;
	}

	public void setBlocked(Boolean blocked) {
		this.blocked = blocked;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public ArrayList<Integer> getOrderIds() {
		return orderIds;
	}

	public void setOrderIds(ArrayList<Integer> orderIds) {
		this.orderIds = orderIds;
	}

	public int getChartId() {
		return chartId;
	}

	public void setChartId(int chartId) {
		this.chartId = chartId;
	}

	public double getPoints() {
		return points;
	}

	public void setPoints(double points) {
		this.points = points;
	}

	public Customer getTypeCustomer() {
		return typeCustomer;
	}

	public void setTypeCustomer(Customer typeCustomer) {
		this.typeCustomer = typeCustomer;
	}

	public int getIdRestaurant() {
		return idRestaurant;
	}

	public void setIdRestaurant(int idRestaurant) {
		this.idRestaurant = idRestaurant;
	}	
	
	public User() {
		
	}

	public User(Boolean deleted, Boolean blocked, String username, String password, String name, String surname,
			Gender gender, Date birthday, Role role, Address address, ArrayList<Integer> orderIds, int chartId,
			double points, Customer typeCustomer, int idRestaurant) {
		super();
		this.deleted = deleted;
		this.blocked = blocked;
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.birthday = birthday;
		this.role = role;
		this.address = address;
		this.orderIds = orderIds;
		this.chartId = chartId;
		this.points = points;
		this.typeCustomer = typeCustomer;
		this.idRestaurant = idRestaurant;
	}
}
