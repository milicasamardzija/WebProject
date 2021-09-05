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
import dto.UserDTO;

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
		
		@POST
		@Path("/saveUserChanges")
		@Produces(MediaType.TEXT_PLAIN)
		@Consumes(MediaType.APPLICATION_JSON)
		public Response saveProileChanges(UserDTO updatedUser) {

			UsersDAO users = getUsers();
			//users.changeUser(updatedUser);
			return Response.status(Response.Status.ACCEPTED).entity("SUCCESS CHANGE").build();
			
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
	
	

