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
import dto.ChangeUserProfileDTO;
import dto.UserChangeDTO;

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
			User userSesion = (User)request.getSession().getAttribute("loginUser");	
			UsersDAO users = getUsers();
			User user = users.getUserByUsername(userSesion.getUsername());
			return user;
		}
	
		//izmena profila
		@POST
		@Path("/changeProfile")
		@Consumes(MediaType.APPLICATION_JSON)
		public void changeUser(ChangeUserProfileDTO user) {
			UsersDAO users = getUsers();
			users.changeUserProfile(user);	
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
	
	

