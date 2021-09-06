package services;

import java.util.ArrayList;
import java.util.Collection;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Restaurant;
import dao.RestaurantDAO;
import dao.UsersDAO;

@Path("/restaurant")
public class RestaurantService {
	@Context
	HttpServletRequest request;
	@Context
	ServletContext context;
	
	public RestaurantService() {
		
	}
	
	private RestaurantDAO getRestaurantsDAO() {
		RestaurantDAO restaurants = (RestaurantDAO)context.getAttribute("restaurants");
		
		if (restaurants == null) {
			restaurants = new RestaurantDAO();
			context.setAttribute("restaurants", restaurants);
		}
	
		return restaurants;
	}
	
	@GET
	@Path("/getAllRestaurants")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Restaurant> getAll() {
		RestaurantDAO restaurantDAO = getRestaurantsDAO();
		ArrayList<Restaurant> ret= new ArrayList<Restaurant>(); 
		for (Restaurant restaurant : restaurantDAO.getValues()) {
			if(!restaurant.getDeleted()) {
				ret.add(restaurant);
			}
			
		}
		return ret;
	}
	
	@GET
	@Path("/get")
	public void get() {
		System.out.println("OVDE SAM");
	}
	
	@POST
	@Path("/deleteRestaurant")
	public void deleteUser(String id){
		System.out.println("ID JE " + id);
			RestaurantDAO restaurants = getRestaurantsDAO();
		restaurants.deleteRestaurantById(Integer.parseInt(id));
			System.out.println("USPESNO IZBRISAN");
	}
}
