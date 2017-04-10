using ForumApp.DataAccess;
using ForumApp.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ForumApp.Controllers
{
    public class CategoryController : Controller
    {
        AppDbContext context;

        public CategoryController()
        {
            context = new AppDbContext();
        }

        public JsonResult GetCategories()
        {
            var categories = context.Categories.Where(x => x.IsActive);
            return Json(categories, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetCategory(int Id)
        {
            var catefory = context.Categories.Where(x => x.CategoryId == Id).FirstOrDefault();
            return Json(catefory, JsonRequestBehavior.AllowGet);
        }

        public void EditCategory(Category category)
        {
            var categoryData = context.Categories.Where(x => x.CategoryId == category.CategoryId && x.IsActive).FirstOrDefault();
            categoryData.CategoryName = category.CategoryName;
            context.Entry(categoryData).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();
        }

        public void DeleteCategory(int CategoryId)
        {
            var categoryData = context.Categories.Where(x => x.CategoryId == CategoryId && x.IsActive).FirstOrDefault();
            categoryData.IsActive = false;
            context.Entry(categoryData).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();
        }

        public ActionResult Index()
        {
            return View();
        }
    }
}