package services;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Context;

import dao.ChartDAO;

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
