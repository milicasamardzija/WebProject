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

import beans.Comment;
import beans.User;
import dao.ArticalChartDAO;
import dao.ChartDAO;
import dao.CommentsDAO;
import dao.RestaurantDAO;
import dto.ArticalChartsDTO;
import dto.CommentDTO;

@Path("/chart")
public class ChartService {
	@Context
	HttpServletRequest request;
	@Context
	ServletContext context;
	
	public ChartService() {
		
	}
	
	private ChartDAO getChartDAO() {
		ChartDAO charts = (ChartDAO)context.getAttribute("charts");
		
		if (charts == null) {
			charts = new ChartDAO();
			context.setAttribute("charts", charts);
		}
	
		return charts;
	}
	
	
}
