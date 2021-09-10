package services;

import java.util.ArrayList;
import java.util.Collection;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Restaurant;
import beans.User;
import dao.RestaurantDAO;
import dao.UsersDAO;
import dto.RestaurantChangeDTO;
import dto.RestaurantNewDTO;
import dto.RestaurantSearchMixDTO;


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
	
	//dodavanje restorana
	@POST
	@Path("/addRestaurant")
	@Consumes(MediaType.APPLICATION_JSON)
	public void addRestaurant(RestaurantNewDTO restaurant) {
		String managerId[] = restaurant.getManagerId().split(" ");
		restaurant.setManagerId(managerId[0] + managerId[1]);
		RestaurantDAO restaurantDAO = getRestaurantsDAO();
		Restaurant newRestaurant = restaurantDAO.addRestaurant(restaurant);
		addRestaurantToManager(newRestaurant);
	} 
	
	//dodavanje restorana menadzeru
	private void addRestaurantToManager(Restaurant newRestaurant) {
		UsersDAO usersDAO = getUsersDAO();
		User user = usersDAO.getUserByUsername(newRestaurant.getManagerId());
		user.setIdRestaurant(newRestaurant.getId());
		usersDAO.saveUsers();
	}
	
	//izmena restorana
	@POST
	@Path("/changeRestaurant")
	@Consumes(MediaType.APPLICATION_JSON)
	public void changeRestaurant(RestaurantChangeDTO restaurant) {
		RestaurantDAO restaurantDAO = getRestaurantsDAO();
		restaurantDAO.changeRestaurant(restaurant);	
	} 
	
	//pretraga kombinovana
	@POST
	@Path("/searchMix")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Restaurant> searchUsers(RestaurantSearchMixDTO restaurant) {
		RestaurantDAO restaurantDAO = getRestaurantsDAO();
		return restaurantDAO.searchMix(restaurant);
	}
	
	//pretraga obicna
	@POST
	@Path("/searchRestaurants")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Restaurant> search(RestaurantSearchMixDTO restaurant) {
		RestaurantDAO restaurantDAO = getRestaurantsDAO();
		return restaurantDAO.searchMix(restaurant);
	}
			
		
	//prikaz restorana
	@POST
	@Path("/getRestaurant")
	@Produces(MediaType.APPLICATION_JSON)
	public Restaurant getUser(String idRestautrant) {
		RestaurantDAO restaurantDAO = getRestaurantsDAO();
		return restaurantDAO.getByID(Integer.parseInt(idRestautrant));	
	} 
		

	@POST
	@Path("/deleteRestaurant")
	public void deleteUser(String id){
		RestaurantDAO restaurants = getRestaurantsDAO();
		restaurants.deleteRestaurantById(Integer.parseInt(id));
	}
	
	
	@POST
	@Path("/filterType")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Restaurant> filterByType(String type) {
		RestaurantDAO restaurantsDAO = getRestaurantsDAO();
		return restaurantsDAO.filterUsersByType(type);
	}
	
	private UsersDAO getUsersDAO() {
		UsersDAO users = (UsersDAO)context.getAttribute("users");
		
		if (users == null) {
			String contextPath = context.getRealPath("");
			users = new UsersDAO(contextPath);
			context.setAttribute("users", users);
		}
	
		return users;
	}
}
