package services;

import java.util.ArrayList;
import java.util.Collection;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Artical;
import beans.User;
import dao.ArticalChartDAO;
import dao.ArticalDAO;
import dao.ChartDAO;
import dto.ArticalChartsDTO;

@Path("/articalChart")
public class ArticalChartService {
	@Context
	HttpServletRequest request;
	@Context
	ServletContext context;
	
	public ArticalChartService() {
		
	}
	
	private ArticalChartDAO getArticalChartDAO() {
		ArticalChartDAO articalsCharts = (ArticalChartDAO)context.getAttribute("articalsCharts");
		
		if (articalsCharts == null) {
			articalsCharts = new ArticalChartDAO();
			context.setAttribute("articalsCharts", articalsCharts);
		}
	
		return articalsCharts;
	}
	
	@POST
	@Path("/addNew")
	public void addNew(Artical artical) {
		ArticalChartDAO articalDAO = getArticalChartDAO();
		User user = (User)request.getSession().getAttribute("loginUser");
		articalDAO.addNew(artical, user);
	}
	
	@GET
	@Path("/getChart")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<ArticalChartsDTO> getChart() {
		ArrayList<ArticalChartsDTO> ret = new ArrayList<ArticalChartsDTO>();
		User user = (User)request.getSession().getAttribute("loginUser");		
		ArticalChartDAO dao = getArticalChartDAO();
		ret = dao.getArticalsForChart(user);
		return ret;
	}
	
	@POST
	@Path("/plus")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<ArticalChartsDTO> plus(String idArtical) {
		ArticalChartDAO articalDAO = getArticalChartDAO();
		User user = (User)request.getSession().getAttribute("loginUser");
		return articalDAO.plus(Integer.parseInt(idArtical), user);
	}
	
	@POST
	@Path("/minus")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<ArticalChartsDTO> minus(String idArtical) {
		ArticalChartDAO articalDAO = getArticalChartDAO();
		User user = (User)request.getSession().getAttribute("loginUser");
		return articalDAO.minus(Integer.parseInt(idArtical), user);
	}
	
}
