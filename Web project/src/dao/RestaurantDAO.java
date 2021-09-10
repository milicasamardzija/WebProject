package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.introspect.VisibilityChecker;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.databind.type.TypeFactory;

import beans.Address;
import beans.Restaurant;
import beans.User;
import dto.RestaurantChangeDTO;
import dto.RestaurantNewDTO;
import dto.RestaurantSearchMixDTO;
import enums.CustomerType;
import enums.RestaurantType;
import enums.Role;
import enums.Status;



public class RestaurantDAO {
	private HashMap<Integer,Restaurant> restaurants;

	public HashMap<Integer, Restaurant> getRestaurants() {
		return restaurants;
	}

	public void setRestaurants(HashMap<Integer, Restaurant> restaurants) {
		this.restaurants = restaurants;
	}
	
	
	public RestaurantDAO() {
		this.setRestaurants(new HashMap<Integer, Restaurant>());
		
		loadRestaurants();
	}
	
	//ucitavanje restorana iz fajla
	@SuppressWarnings("unchecked")
	private void loadRestaurants() {
		FileWriter fileWriter = null;
		BufferedReader in = null;
		File file = null;
		try {
			file = new File("WebContent/data/restaurants.txt");
			in = new BufferedReader(new FileReader(file));

			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.setVisibilityChecker(
					VisibilityChecker.Std.defaultInstance().withFieldVisibility(JsonAutoDetect.Visibility.ANY));
			TypeFactory factory = TypeFactory.defaultInstance();
			MapType type = factory.constructMapType(HashMap.class, Integer.class, Restaurant.class);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			this.restaurants = ((HashMap<Integer, Restaurant>) objectMapper.readValue(file, type));
		} catch (FileNotFoundException fnfe) {
			try {
				file.createNewFile();
				fileWriter = new FileWriter(file);
				ObjectMapper objectMapper = new ObjectMapper();
				objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
				objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
				String string = objectMapper.writeValueAsString(restaurants);
				fileWriter.write(string);
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				if (fileWriter != null) {
					try {
						fileWriter.close();
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}

		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}
	

	public Collection<Restaurant> getValues() {
		return this.restaurants.values();
	}

	public Restaurant getByID(int restaurantId) {
		for (Restaurant restaurant : this.restaurants.values()) {
			if(restaurant.getId() == restaurantId) {
				return restaurant;
			}
		}
		return null;
	}
	
	
	
	public void deleteRestaurantById(int id) {
		Restaurant restaurant = getByID(id);
		if(restaurant !=null) {
			restaurant.setDeleted(true);
			saveRestaurants();
			
		}
	}
	
	
	//ucitavanje restorana u fajl
	private void saveRestaurants() {
		File f = new File("WebContent/data/restaurants.txt");
		FileWriter fileWriter = null;
		try {
			fileWriter = new FileWriter(f);
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			String stringRestaurants = objectMapper.writeValueAsString(this.restaurants);
			fileWriter.write(stringRestaurants);
			fileWriter.flush();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (fileWriter != null) {
				try {
					fileWriter.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}

	public Restaurant addRestaurant(RestaurantNewDTO restaurant) {
		Restaurant newRestaurant = new Restaurant(generateIdRestaurant(),restaurant.managerId, restaurant.name, restaurant.type, new ArrayList<Integer>(), Status.OPEN, new Address(restaurant.street, restaurant.number, restaurant.city, restaurant.zipCode, 0, 0), generateLink(restaurant.link), false, -1);
		this.restaurants.put(newRestaurant.getId(), newRestaurant);
		saveRestaurants();
		return newRestaurant;
	}

	private String generateLink(String link) {
		String ret="";
		//C:\fakepath\20180717_155517.jpg
		String path[] = link.split("fakepath");
		ret = path[1].substring(1);
		System.out.println(path);
		System.out.println(ret);
		return ret;
	}

	private Integer generateIdRestaurant() {
		int ret = 0;
        for (Restaurant restaurantBig : this.getValues())
        {
            for (Restaurant restaurant : this.getValues())
            {
                if (ret == restaurant.getId())
                {
                    ++ret;
                    break;
                }
            }
        }
        return ret;
	}

	public void changeRestaurant(RestaurantChangeDTO restaurant) {
		Restaurant restaurantChange = getByID(restaurant.id);
		restaurantChange.setName(restaurant.name);
		restaurantChange.setType(restaurant.type);
		restaurantChange.setAddress(new Address(restaurant.street, restaurant.number, restaurant.city, restaurant.zipCode));
		restaurantChange.setLink(restaurant.link);
		restaurantChange.setManagerId(restaurant.managerId);
		saveRestaurants();
	}
	
	
	private RestaurantType checkTypeRestaurant(String type)
	{
		RestaurantType ret =null;
		if(type.equals("ITALIAN")) {
			ret=RestaurantType.ITALIAN;
		}
		if(type.equals("CHINESE")) {
			ret=RestaurantType.CHINESE;
		}
		 if(type.equals("PIZZA")) {
			 ret=RestaurantType.PIZZA;
		} 
		 if(type.equals("BARBECUE")) {
			ret=RestaurantType.PIZZA;
		}
		if(type.equals("FISH")) {
			ret=RestaurantType.FISH;
		}
		if(type.equals("VEGE")) {
			ret=RestaurantType.VEGE;
		} 
		if(type.equals("MEXICAN")) {
			ret=RestaurantType.MEXICAN;
		} 
		return ret;
	}

	public Collection<Restaurant> filterUsersByType(String type) {
		RestaurantType typeRestaurant = checkTypeRestaurant(type);
		ArrayList<Restaurant> ret = new ArrayList<Restaurant>();
		for(Restaurant restaurant : this.restaurants.values()) {
			if(restaurant.getType().equals(typeRestaurant)) {
				ret.add(restaurant);
			}
		}
		return null;
	}

	public Collection<Restaurant> searchMix(RestaurantSearchMixDTO parameters) {
		ArrayList<Restaurant> ret = new ArrayList<Restaurant>();
		for(Restaurant restaurant : this.restaurants.values()) {
			if(restaurant.getType().equals(parameters.type) && restaurant.getName().toLowerCase().contains(parameters.name.toLowerCase()) && (restaurant.getGrade() == Integer.parseInt(parameters.grade)) && (restaurant.getAddress().getCity().toLowerCase().contains(parameters.location.toLowerCase()) || restaurant.getAddress().getStreet().toLowerCase().contains(parameters.location.toLowerCase()) )) 
			{
				ret.add(restaurant);
			}
		}
		return ret;
	}

	/*public Collection<Restaurant> searchNotMix(RestaurantSearchMixDTO parameters) {
		ArrayList<Restaurant> ret = new ArrayList<Restaurant>();
		if(parameters.equals(null)) {
			return this.getValues();
		}
		for(Restaurant restaurant : this.restaurants.values()) {
			
			if(restaurant.getType().equals(parameters.type) || restaurant.getName().toLowerCase().contains(parameters.name.toLowerCase()) || (restaurant.getGrade() == Integer.parseInt(parameters.grade)) || (restaurant.getAddress().getCity().toLowerCase().contains(parameters.location.toLowerCase()) || restaurant.getAddress().getStreet().toLowerCase().contains(parameters.location.toLowerCase()) )) 
			{
				ret.add(restaurant);
			}
		}
		return ret;
	}*/
	
}
