using ForumApp.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ForumApp.DataAccess
{
    public class AppDbContext : DbContext
    {
        public AppDbContext()
            : base("name=MyConStr")
        {
            Database.SetInitializer(new AppDbContextInitializer());
        }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Forum> Forums { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Forum>().Property(x => x.ForumId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            //base.OnModelCreating(modelBuilder);
        }

    }
}
