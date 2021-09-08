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
import dto.UserChangeProfileDTO;

@Path("/profile")
public class ProfileService {

		@Context
		HttpServletRequest request;
		@Context
		ServletContext context;
		
		public ProfileService() {
			
		}
		
		@GET
		@Path("/profileUser")
		@Produces(MediaType.APPLICATION_JSON)
		public User getUserInformations() {
			User user = (User)request.getSession().getAttribute("loginUser");		
			return user;
		}
		
		//izmena korisnika
		@POST
		@Path("/changeUser")
		@Produces(MediaType.TEXT_HTML)
		@Consumes(MediaType.APPLICATION_JSON)
		public void changeUser(UserChangeProfileDTO user) {
			UsersDAO users = getUsers();
			System.out.println("POKUSAO SAM");
			users.changeUser(user);	
			System.out.println("IZMENIO SAM");
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
	
	

