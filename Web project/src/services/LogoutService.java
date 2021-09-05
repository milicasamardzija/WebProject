package services;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import javax.ws.rs.core.Response;

@Path("/logout")
public class LogoutService {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	
	@GET
	@Path("/userLogout")
	@Produces(MediaType.TEXT_HTML)
	public Response logoutUser() {
		
		HttpSession session = request.getSession();
		 if(session != null && session.getAttribute("loginUser")!= null) {
			 session.invalidate();
			 System.out.println("ODJAVA RADI");
			 	 return Response.status(Response.Status.ACCEPTED).entity("/WebShopREST/index.html")
				 .build();
		 }
	
	return Response 
			 .status(Response.Status.METHOD_NOT_ALLOWED)
			 .entity("Nemate dozvolu da se izlogujete!")
			 .build();
	
}
}
