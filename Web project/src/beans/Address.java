package beans;

public class Address {
	private String street;
	private int number;
	private String city;
	private int zipCode;
	private double latitude;
	private double longitude;
	
	public Address(String street, int number, String city, int zipCode, double latitude, double longitude) {
		super();
		this.street = street;
		this.number = number;
		this.city = city;
		this.zipCode = zipCode;
		this.latitude = latitude;
		this.longitude = longitude;
	}
	
}
