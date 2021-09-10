package services;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Context;

import dao.ArticalChartDAO;

public class ArticalChartService {
	@Context
	HttpServletRequest request;
	@Context
	ServletContext context;
	
	public ArticalChartService() {
		
	}
	
	private ArticalChartDAO getArticalChartDAO() {
		ArticalChartDAO articals = (ArticalChartDAO)context.getAttribute("articals");
		
		if (articals == null) {
			articals = new ArticalChartDAO();
			context.setAttribute("articals", articals);
		}
	
		return articals;
	}
}
