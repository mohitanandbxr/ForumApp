using ForumApp.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ForumApp.DataAccess
{
    public class AppDbContextInitializer : DropCreateDatabaseIfModelChanges<AppDbContext>
    {
        protected override void Seed(AppDbContext context)
        {
            List<Category> categories = new List<Category>();
            List<Forum> forums = new List<Forum>();

            categories.Add(new Category() { CategoryId = 1, CategoryName = "Human Resource", IsActive = true });
            categories.Add(new Category() { CategoryId = 2, CategoryName = "IT", IsActive = true });
            categories.Add(new Category() { CategoryId = 3, CategoryName = "Facilities", IsActive = true });

            forums.Add(new Forum() { ForumId = 1, Contents = "This is the content of Forum1.", CreatedBy = "Mohit Anand", Title= "How to do 1",IsActive = true, CategoryId = 1 });
            forums.Add(new Forum() { ForumId = 2, Contents = "This is the content of Forum2.", CreatedBy = "Raman Raj", Title = "How to do 2", IsActive = true, CategoryId = 2 });
            forums.Add(new Forum() { ForumId = 3, Contents = "This is the content of Forum3.", CreatedBy = "Sanjay Aggarwal", Title = "How to do 3", IsActive = true, CategoryId = 3 });
            forums.Add(new Forum() { ForumId = 4, Contents = "This is the content of Forum4.", CreatedBy = "Nitin Desai", Title = "How to do 4", IsActive = true, CategoryId = 1 });
            forums.Add(new Forum() { ForumId = 5, Contents = "This is the content of Forum5.", CreatedBy = "Manoj Prabhakar", Title = "How to do 5", IsActive = true, CategoryId = 2 });
            forums.Add(new Forum() { ForumId = 6, Contents = "This is the content of Forum6.", CreatedBy = "Deepak Singh", Title = "How to do 6", IsActive = true, CategoryId = 3 });

            foreach (var item in categories)
            {
                context.Categories.Add(item);
            }

            foreach (var item in forums)
            {
                context.Forums.Add(item);
            }
            base.Seed(context);
        }
    }
}
