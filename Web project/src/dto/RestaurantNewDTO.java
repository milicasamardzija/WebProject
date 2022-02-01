package dto;

import enums.RestaurantType;

public class RestaurantNewDTO {
	public String name;
	public RestaurantType type;
	public String street;
	public int number;
	public String city;
	public int zipCode;
	public String link;
	public String managerId;
	public double latitude;
	public double longitude;
	
	public String getManagerId() {
		return managerId;
	}
	public void setManagerId(String managerId) {
		this.managerId = managerId;
	}
	
	
}
