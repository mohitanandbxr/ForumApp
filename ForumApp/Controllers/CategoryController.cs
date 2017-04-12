using ForumApp.DataAccess;
using ForumApp.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mail;
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
        public JsonResult GetCategory(int Id)
        {
            var category = context.Categories.Where(x => x.CategoryId == Id).FirstOrDefault();
            return Json(category, JsonRequestBehavior.AllowGet);
        }

        public void AddCategory(Category category) 
        {
            category.IsActive = true;
            context.Categories.Add(category);
            context.SaveChanges();
        }

        public void EditCategory(Category category)
        {
            var categoryData = context.Categories.Where(x => x.CategoryId == category.CategoryId && x.IsActive).FirstOrDefault();
            categoryData.CategoryName = category.CategoryName;
            categoryData.IsActive = true;
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
            var forumInfo = from a in context.Forums
                            join b in context.Categories
                            on a.CategoryId equals b.CategoryId
                            select new { Title = a.Title, MyCategory = b.CategoryName };
            return View();
        }
    }
}