package services;

import java.util.ArrayList;
import java.util.Collection;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Artical;
import beans.Restaurant;
import dao.ArticalDAO;
import dao.RestaurantDAO;

@Path("/artical")
public class ArticalService {
	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext context;
	
	public ArticalService() {
		
	}
	
	private ArticalDAO getArticalDAO() {
		ArticalDAO articals = (ArticalDAO)context.getAttribute("articals");
		
		if (articals == null) {
			articals = new ArticalDAO();
			context.setAttribute("articals", articals);
		}
	
		return articals;
	}
	
	@GET
	@Path("/getAllArticals")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Artical> getAll() {
		ArticalDAO articalDAO = getArticalDAO();
		ArrayList<Artical> ret= new ArrayList<Artical>(); 
		for (Artical artical : articalDAO.getValues()) {
			//if(!artical.getDeleted()) {
				ret.add(artical);
			//}
			
		}
		return ret;
	}
}
