package services;

import java.util.Collection;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Restaurant;
import dao.RestaurantDAO;

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
		return restaurantDAO.getValues();
	}
	
	@GET
	@Path("/get")
	public void get() {
		System.out.println("OVDE SAM");
	}
	
}
