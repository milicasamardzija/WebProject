package dto;

import enums.RestaurantType;

public class RestaurantSearchMixDTO {
	public String name;
	public String location;
	public RestaurantType type;
	public String grade;
	@Override
	public String toString() {
		return "RestaurantSearchMixDTO [name=" + name + ", location=" + location + ", type=" + type + ", grade=" + grade
				+ "]";
	}
	
	
}
