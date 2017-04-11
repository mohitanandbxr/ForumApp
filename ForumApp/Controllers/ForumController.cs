using ForumApp.DataAccess;
using ForumApp.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ForumApp.Controllers
{
    public class ForumController : Controller
    {
        AppDbContext context;

        public ForumController()
        {
            context = new AppDbContext();
        }

        public JsonResult GetForums(int? Id)
        {
            if(Id == null)
            {
                var forums = context.Forums.Where(x => x.IsActive);
                return Json(forums, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var forums = context.Forums.Where(x => x.IsActive && x.CategoryId == Id);
                return Json(forums, JsonRequestBehavior.AllowGet);
            }
        }

        public void EditForum(Forum forum)
        {
            var forumData = context.Forums.Where(x => x.ForumId == forum.ForumId && x.IsActive).FirstOrDefault();
            forumData.Title = forum.Title;
            forumData.Contents = forum.Contents;
            forumData.CreatedBy = forum.CreatedBy;
            context.Entry(forumData).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();
        }

        public void AddForum(Forum forum)
        {
            forum.IsActive = true;
            context.Forums.Add(forum);
            context.SaveChanges();
        }

        public void DeleteForum(int Id)
        {
            var forum = context.Forums.Where(x => x.ForumId == Id && x.IsActive).FirstOrDefault();
            forum.IsActive = false;
            context.Entry(forum).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();
        }

        public ActionResult Index()
        {
            return View();
        }
    }
}