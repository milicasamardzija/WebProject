package services;

import java.util.Collection;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.User;
import dao.UsersDAO;
import dto.UserNewDTO;
import dto.UserDTO;
import dto.UserLoginDTO;
import dto.UserRegistrationDTO;
import dto.UserSearchDTO;
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
	@Path("/getAllUsers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getAll() {
		UsersDAO users = getUsers();
		return users.getValues();
		
	}
	
	@POST
	@Path("/login")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response login(UserLoginDTO user) {
		UsersDAO users = getUsers();
		
		User userForLogin = users.getUserByUsername(user.username);
		
		if(userForLogin == null) {
			return Response.status(Response.Status.BAD_REQUEST).entity("Korisnicko ime je pogresno!Probajte ponovo!!").build();
		}
		
		if(!userForLogin.getPassword().equals(user.password)) {
			return Response.status(Response.Status.BAD_REQUEST).entity("Lozinka koju ste uneli je pogresna!Probajte ponovo!!").build();
		}
		
		request.getSession().setAttribute("loginUser", userForLogin); //kacimo sesiju za korisnika
		
		if(userForLogin.getRole().equals(Role.ADMINISTRATOR)) {
			return Response.status(Response.Status.ACCEPTED).entity("/WebShopREST/html/admin_dashboard.html").build();
		}
		
		if(userForLogin.getRole().equals(Role.MANAGER)) {
			return Response.status(Response.Status.ACCEPTED).entity("/WebShopREST/html/menadzer_profil.html").build();
		}
		
		if(userForLogin.getRole().equals(Role.DELIVERER)) {
			return Response.status(Response.Status.ACCEPTED).entity("/WebShopREST/html/dostavljac_profil.html").build();
		}
		
		if(userForLogin.getRole().equals(Role.CUSTOMER)) {
			return Response.status(Response.Status.ACCEPTED).entity("/WebShopREST/html/kupac_profil.html").build();
		}
		
		return Response.status(Response.Status.ACCEPTED).entity("/WebShopREST/index.html").build();
	}
	
	@POST
	@Path("/registration")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response registration(UserRegistrationDTO user) {
		UsersDAO users = getUsers();

		if (users.getUserByUsername(user.username) != null) {
			return Response.status(Response.Status.BAD_REQUEST)
					.entity("Uneto korisnicko ime je vec zauzeto.Molimo unesite drugo.").build();
		}
	
		users.registerUser(user);
		return Response.status(Response.Status.ACCEPTED).entity("/WebShopREST/index.html").build();	//redirekcija na logovanje																			
	}
	
	//nisam sigurna da l je neophodno ova provera za admina al kontam ne smeta
	//treba proveriti za odgovor da li treba ovo da bude
	@POST
	@Path("/blockUser")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response blockUser(UserDTO user){
		
		if(isUserAdmin()) {
			UsersDAO users = getUsers();
			users.blockUserById(user.user.getUsername());
			
			return Response
					.status(Response.Status.ACCEPTED).entity("SUCCESS BLOCK")
					.entity(getUsers().getValues())
					.build();
		}
		return Response.status(403).type("text/plain")
				.entity("You do not have permission to access!").build();
	}
	
	//treba proveriti za odgovor da li treba ovo da bude
	@DELETE
	@Path("/deleteUser")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deleteUser(UserDTO user){
		
		if(isUserAdmin()) {
			UsersDAO users = getUsers();
			users.deleteUserById(user.user.getUsername());
			
			return Response
					.status(Response.Status.ACCEPTED).entity("DELETED")
					.entity(getUsers().getValues())
					.build();
		}
		return Response.status(403).type("text/plain")
				.entity("You do not have permission to access!").build();
	}
	
	//dodavanje korisnika
	@POST
	@Path("/addUser")
	@Consumes(MediaType.APPLICATION_JSON)
	public UserNewDTO addUser(UserNewDTO user) {
		UsersDAO users = getUsers();
		users.addUser(user);	
		return user;
	} 
	
	//pretraga korisnika
	@POST
	@Path("/searchUsers")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> searchUsers(UserSearchDTO user) {
		UsersDAO users = getUsers();
		return users.searchUsers(user);
	}
	
	//izmena korisnika
	@POST
	@Path("/changeUser")
	@Consumes(MediaType.APPLICATION_JSON)
	public void changeUser(UserDTO user) {
		UsersDAO users = getUsers();
		users.changeUser(user.user);	
	} 
	
	//prikaz korisnika
	@POST
	@Path("/getUser")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public User getUser(User user) {
		UsersDAO users = getUsers();
		return users.getUserByUsername(user.getUsername());	
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
	
	private boolean isUserAdmin() {
		User user = (User) request.getSession().getAttribute("loginUser");
		
		if(user!= null) {
			if(user.getRole().equals(Role.ADMINISTRATOR)) {
				return true;
			}
		}	
		return false;
	}
	

	
}
