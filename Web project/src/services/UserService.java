package services;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.User;
import dao.UsersDAO;
import dto.UserLoginDTO;
import enums.Role;

@Path("/user")
public class UserService {
	
	@Context
	ServletContext context;
	@Context
	HttpServletRequest request;
	
	public UserService() {
		
	}
	
	@GET
	@Path("/bozepomozi")
	public void hej() {
		System.out.println("HEEJ USPELA SI");
	}
	
	@POST
	@Path("/login")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response login(UserLoginDTO user) {
		System.out.println("TU SAAAAAAAAAAAAAM");
		UsersDAO users = getUsers();
		
		User userForLogin = users.getUserByUsername(user.username);
		
		if(userForLogin == null) {
			System.out.println("Nema usera");
			return Response.status(Response.Status.BAD_REQUEST).entity("Korisnicko ime je pogresno!Probajte ponovo!!").build();
		}
		
		if(!userForLogin.getPassword().equals(user.password)) {
			System.out.println("losa sifra");
			return Response.status(Response.Status.BAD_REQUEST).entity("Lozinka koju ste uneli je pogresna!Probajte ponovo!!").build();
		}
		
		request.getSession().setAttribute("loginUser", userForLogin); //kacimo sesiju za korisnika
		
		if(userForLogin.getRole().equals(Role.ADMINISTRATOR)) {
			System.out.println("admin sam");
			return Response.status(Response.Status.ACCEPTED).entity("/WebShopREST/html/administrator_profil.html").build();
		}
		
		if(userForLogin.getRole().equals(Role.MANAGER)) {
			System.out.println("menadzer sam");
			return Response.status(Response.Status.ACCEPTED).entity("/WebShopREST/html/menadzer_profil.html").build();
		}
		
		if(userForLogin.getRole().equals(Role.DELIVERER)) {
			System.out.println("dostavljac sam");
			return Response.status(Response.Status.ACCEPTED).entity("/WebShopREST/html/dostavljac_profil.html").build();
		}
		
		if(userForLogin.getRole().equals(Role.CUSTOMER)) {
			System.out.println("kupac sam");
			return Response.status(Response.Status.ACCEPTED).entity("/WebShopREST/html/kupac_profil.html").build();
		}
		
		System.out.println("idem na index.html");
		return Response.status(Response.Status.ACCEPTED).entity("/WebShopREST/index.html").build();
	}
	
	private UsersDAO getUsers() {
		UsersDAO users = (UsersDAO)context.getAttribute("users");
		
		if (users == null) {
			String contextPath = context.getRealPath("");
			users = new UsersDAO(contextPath);
			context.setAttribute("users", users);
		}
	
		return users;
	}
	
}
