package beans;

public class Address {
	private String street;
	private int number;
	private String city;
	private int zipCode;
	private double latitude; //samo restoran 
	private double longitude; //samo restoran
	 
	public Address() {
		
	}
	
	public Address(String street, int number, String city, int zipCode, double latitude, double longitude) {
		super();
		this.street = street;
		this.number = number;
		this.city = city;
		this.zipCode = zipCode;
		this.latitude = latitude;
		this.longitude = longitude;
	}
	
	public Address(String street, int number, String city, int zipCode) {
		super();
		this.street = street;
		this.number = number;
		this.city = city;
		this.zipCode = zipCode;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public int getZipCode() {
		return zipCode;
	}

	public void setZipCode(int zipCode) {
		this.zipCode = zipCode;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
}
