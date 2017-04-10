using ForumApp.DataAccess;
using ForumApp.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ForumApp.Controllers
{
    public class HomeController : Controller
    {
        AppDbContext context;

        public HomeController()
        {
            context = new AppDbContext();
        }
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            return View();
        }

        public JsonResult GetCategories()
        {
            var data = context.Categories.Where(x => x.IsActive);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetForums(int? Id)
        {
            if(Id == null)
            {
                var data = context.Forums.Where(x => x.IsActive);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var data = context.Forums.Where(x => x.IsActive && x.CategoryId == Id);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            
            
        }
    }
}
